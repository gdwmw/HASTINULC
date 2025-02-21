"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { FaClipboardList, FaHistory, FaSignOutAlt, FaUser } from "react-icons/fa";

import logo from "@/public/assets/images/logos/Black.svg";
import { ExampleATWM } from "@/src/components";
import { useGlobalStates } from "@/src/context";
import { questionnairesConditions as conditions } from "@/src/hooks";
import { NAVIGATION_DATA } from "@/src/libs/constants";
import { IDatasResponse } from "@/src/types/api";

interface I {
  response: IDatasResponse | null | undefined;
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const { setOpen } = useGlobalStates();
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const questionnairesConditions = conditions(props.response);

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
              <div className="relative active:scale-95">
                {questionnairesConditions && (
                  <div className="absolute -bottom-px -right-px z-[1] flex size-4 items-center justify-center rounded-full bg-white">
                    <div className="relative flex size-2">
                      <div className="absolute size-full animate-ping rounded-full bg-rose-400 opacity-75" />
                      <div className="size-2 rounded-full bg-rose-500" />
                    </div>
                  </div>
                )}
                <div className="relative aspect-square size-[45px] overflow-hidden rounded-full border border-gray-200">
                  <Image
                    alt="Review Image"
                    className="cursor-pointer object-cover"
                    fill
                    onClick={() => setMenuOpen(!menuOpen)}
                    quality={30}
                    src={props.session?.user?.image ?? ""}
                  />
                </div>
              </div>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
                  <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-rose-400 hover:text-white active:bg-rose-500 active:text-white"
                    href={`/profile`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUser className="text-base" />
                    Profile
                  </Link>
                  <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-rose-400 hover:text-white active:bg-rose-500 active:text-white"
                    href={`/history/${props.session?.user?.username}`}
                    onClick={() => {
                      setMenuOpen(false);
                      setOpen({ bookingSummary: true });
                    }}
                  >
                    <FaHistory className="text-base" />
                    History
                  </Link>
                  <Link
                    className={`group flex items-center justify-between gap-2 px-4 py-2 text-sm ${questionnairesConditions ? "hover:bg-rose-400 hover:text-white active:bg-rose-500 active:text-white" : "cursor-not-allowed text-gray-400"}`}
                    href={`/questionnaire`}
                    onClick={(e) => {
                      if (!questionnairesConditions) {
                        e.preventDefault();
                      } else {
                        setMenuOpen(false);
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <FaClipboardList className="text-base" />
                      <span>Questionnaire</span>
                    </div>
                    {questionnairesConditions && (
                      <div className="relative mt-[2px] flex size-2">
                        <div className="absolute size-full animate-ping rounded-full bg-rose-400 opacity-75 group-hover:bg-white" />
                        <div className="size-2 rounded-full bg-rose-500 group-hover:bg-white" />
                      </div>
                    )}
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
            <Link className={ExampleATWM({ color: "rose", size: "sm", variant: "solid" })} href={"/authentication/login"}>
              LOGIN
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
