"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { FaHistory, FaSignOutAlt, FaUser } from "react-icons/fa";

import logo from "@/public/assets/images/logos/Black.svg";
import { ExampleATWM } from "@/src/components/interfaces/example/A";
import { useGlobalStates } from "@/src/context";
import { NAVIGATION_DATA } from "@/src/libs/constants";

interface I {
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const { setOpen } = useGlobalStates();
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSmoothScroll = (e: FormEvent, href: string) => {
    e.preventDefault();
    if (href === "#home") {
      window.scrollTo({ behavior: "smooth", top: 0 });
    } else {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleActiveSection = () => {
      const sections = NAVIGATION_DATA.map((item) => document.querySelector(item.href));

      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();

          if (rect.top <= window.innerHeight / 5 && rect.bottom >= window.innerHeight / 5) {
            setActiveSection(section.id);
          }
        }
      });
    };

    handleActiveSection();

    window.addEventListener("scroll", handleActiveSection);

    return () => window.removeEventListener("scroll", handleActiveSection);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && !(e.target as HTMLElement).closest("#profile-menu")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className={`flex h-[88px] items-center justify-between bg-white px-10 text-lg ${activeSection !== "home" && "shadow-md"}`}>
      <Image alt="Hastinulc Makeup Art" src={logo} width={210} />

      <ul className="flex items-center gap-5 font-semibold">
        {NAVIGATION_DATA.map((dt) => (
          <li key={dt.id}>
            <Link
              className={ExampleATWM({
                className: `${activeSection === dt.href.substring(1) ? "border-b-2 border-rose-500 text-rose-500" : "text-black"}`,
                color: "rose",
                size: "md",
                variant: "ghost",
              })}
              href={dt.href}
              onClick={(e) => handleSmoothScroll(e, dt.href)}
              prefetch={false}
            >
              {dt.label}
            </Link>
          </li>
        ))}

        <li className="relative">
          {props.session?.user?.status ? (
            <div id="profile-menu">
              <Image
                alt="Photo Profile"
                className="cursor-pointer rounded-full border border-black p-0.5 active:scale-95"
                height={40}
                onClick={() => setMenuOpen(!menuOpen)}
                src={props.session?.user?.image ?? ""}
                width={40}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
                  <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-rose-400 hover:text-white active:bg-rose-500 active:text-white"
                    href={`/user/profile/${props.session?.user?.username}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUser className="text-base" />
                    Profile
                  </Link>
                  <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-rose-400 hover:text-white active:bg-rose-500 active:text-white"
                    href={`/user/history/${props.session?.user?.username}`}
                    onClick={() => {
                      setMenuOpen(false);
                      setOpen({ bookingSummary: true });
                    }}
                  >
                    <FaHistory className="text-base" />
                    History
                  </Link>
                  <button
                    className="flex w-full items-center justify-center gap-2 border-t border-gray-200 px-4 py-2 text-sm hover:bg-rose-400 hover:text-white active:bg-rose-500 active:text-white"
                    onClick={() => signOut()}
                  >
                    <FaSignOutAlt className="text-base" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className={ExampleATWM({ color: "rose", size: "sm", variant: "solid" })} href={"/login"}>
              LOGIN
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
