"use client";

import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FC, FormEvent, ReactElement, useEffect, useState } from "react";

import logo from "@/public/assets/images/logos/Black.svg";
import { ExampleATWM } from "@/src/components/interfaces/example/A";
import { NAVIGATION_DATA } from "@/src/libs/constants";

interface I {
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const [activeSection, setActiveSection] = useState("");

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

        <li>
          {props.session?.user?.status ? (
            <Image
              alt="Photo Profile"
              className="cursor-pointer rounded-full border border-black p-0.5 active:scale-95"
              height={40}
              src={props.session?.user?.image ?? ""}
              width={40}
            />
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
