"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { FaClipboardList, FaHistory, FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiOutlineBars3 } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";

import logo from "@/public/assets/images/logos/Black.svg";
import { Avatar, DetailedAvatar, ExampleA, ExampleATWM } from "@/src/components";
import { useGlobalStates } from "@/src/context";
import { questionnaireConditions as conditions } from "@/src/hooks";
import { NAVIGATION_DATA } from "@/src/libs";
import { IDataResponse } from "@/src/types";

interface I {
  response: IDataResponse | null | undefined;
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const { setOpen } = useGlobalStates();
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const questionnaireConditions = conditions({ data: props.response, session: props.session });

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
    <nav
      className={`flex h-[88px] items-center justify-between gap-5 bg-white px-5 text-lg min-[850px]:px-10 ${activeSection !== "home" && "shadow-md"}`}
    >
      <Image alt="Hastinulc Makeup Art" priority src={logo} width={200} />

      <ul className="hidden items-center gap-5 font-semibold min-[850px]:flex">
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
              <div className="relative flex items-center active:scale-95">
                <button onClick={() => setMenuOpen((prev) => !prev)}>
                  {questionnaireConditions && (
                    <div className="absolute -right-0.5 bottom-0 z-[1] flex size-4 items-center justify-center rounded-full bg-white">
                      <div className="relative flex size-2">
                        <div className="absolute size-full animate-ping rounded-full bg-rose-400 opacity-75" />
                        <div className="size-2 rounded-full bg-rose-500" />
                      </div>
                    </div>
                  )}

                  <Avatar size="sm" src={props.session?.user?.image ?? ""} />
                </button>
              </div>

              {menuOpen && (
                <ul className="absolute right-0 mt-2 w-96 overflow-hidden rounded-lg border border-gray-200 bg-white p-5 shadow-md">
                  <li>
                    <DetailedAvatar
                      email={props.session?.user?.email ?? ""}
                      name={props.session?.user?.name ?? ""}
                      src={props.session?.user?.image ?? ""}
                      status={props.session?.user?.status}
                    />
                  </li>

                  <div className="my-3 border-t border-gray-300" />

                  <li>
                    <Link
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-black hover:bg-rose-400 hover:text-white active:bg-rose-500"
                      href="/profile"
                    >
                      <FaUser size={16} />
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-black hover:bg-rose-400 hover:text-white active:bg-rose-500"
                      href={`/history/${props.session?.user?.username}`}
                      onClick={() => setOpen({ historyAsideSwitch: false, historyDetailSwitch: false })}
                    >
                      <FaHistory size={16} />
                      History
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`group flex items-center justify-between rounded-md px-4 py-2 ${
                        questionnaireConditions
                          ? "text-black hover:bg-rose-400 hover:text-white active:bg-rose-500"
                          : "cursor-not-allowed text-gray-400"
                      }`}
                      href={`/questionnaire`}
                      onClick={(e) => {
                        if (!questionnaireConditions) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <FaClipboardList size={16} />
                        <span>Questionnaire</span>
                      </div>
                      {questionnaireConditions && (
                        <div className="relative mt-[2px] flex size-2">
                          <div className="absolute size-full animate-ping rounded-full bg-rose-400 opacity-75 group-hover:bg-white" />
                          <div className="size-2 rounded-full bg-rose-500 group-hover:bg-white" />
                        </div>
                      )}
                    </Link>
                  </li>

                  {props.session.user.role === "admin" && (
                    <li>
                      <Link
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-black hover:bg-rose-400 hover:text-white active:bg-rose-500"
                        href="/admin/dashboard"
                      >
                        <MdSpaceDashboard className="-mr-px" size={17} />
                        Dashboard
                      </Link>
                    </li>
                  )}

                  <div className="my-3 border-t border-gray-300" />

                  <li>
                    <button
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-black hover:bg-rose-400 hover:text-white active:bg-rose-500"
                      onClick={() => signOut()}
                    >
                      <FaSignOutAlt size={16} />
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link className={ExampleATWM({ color: "rose", size: "sm", variant: "solid" })} href={"/authentication/login"}>
              LOGIN
            </Link>
          )}
        </li>
      </ul>

      <div className="relative active:scale-95 min-[850px]:hidden">
        <ExampleA className="flex active:scale-100" color="rose" onClick={() => setOpen({ homeAside: true })} size="sm" variant="ghost">
          {questionnaireConditions && (
            <div className="absolute -right-0.5 bottom-0.5 z-[1] flex size-4 items-center justify-center rounded-full bg-white">
              <div className="relative flex size-2">
                <div className="absolute size-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <div className="size-2 rounded-full bg-rose-500" />
              </div>
            </div>
          )}
          <HiOutlineBars3 size={30} />
        </ExampleA>
      </div>
    </nav>
  );
};
