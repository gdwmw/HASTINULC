"use client";

import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FC, FormEvent, ReactElement, useEffect, useState } from "react";

import logo from "@/public/assets/images/logos/Black.png";
import { getAllSession } from "@/src/hooks/session";
import { NAVIGATION_DATA } from "@/src/libs/constants";

export const Nav: FC = (): ReactElement => {
  const [session, setSession] = useState<null | Session>();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleSmoothScroll = (e: FormEvent, href: string) => {
    e.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchSession = async () => {
      const res = await getAllSession();
      setSession(res);
      setMounted(true);
    };

    fetchSession();
  }, []);

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

  return (
    <nav className="fixed inset-x-0 top-0 z-10 flex h-[88px] items-center justify-between border-b-2 border-black px-10 text-lg">
      <Image alt="Hastinulc Makeup Art" src={logo} width={210} />

      <ul className="flex items-center gap-5 font-semibold">
        {NAVIGATION_DATA.map((dt) => (
          <li key={dt.id}>
            <Link
              className={`${activeSection === dt.href.substring(1) ? "border-b-2 border-black" : ""}`}
              href={dt.href}
              onClick={(e) => handleSmoothScroll(e, dt.href)}
            >
              {dt.label}
            </Link>
          </li>
        ))}

        <li className="active:scale-95">
          {session?.user?.status === "authenticated" ? (
            <Image alt="Photo Profile" className="rounded-full border border-black p-0.5" height={40} src={session?.user?.image ?? ""} width={40} />
          ) : (
            mounted && (
              <Link className="rounded-md border-2 border-black px-3 py-1 hover:bg-black hover:text-white" href={"/login"}>
                Login
              </Link>
            )
          )}
        </li>
      </ul>
    </nav>
  );
};
