"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { FaClipboardList, FaHistory, FaSignOutAlt, FaUser } from "react-icons/fa";
import { GoDot, GoDotFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";

import { DetailedAvatar, ExampleA, ExampleATWM } from "@/src/components";
import { useGlobalStates } from "@/src/context";
import { questionnaireConditions as conditions } from "@/src/hooks";
import { NAVIGATION_DATA } from "@/src/libs";
import { IDataResponse } from "@/src/types";

interface I {
  response: IDataResponse | null | undefined;
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const { open, setOpen } = useGlobalStates();
  const [activeSection, setActiveSection] = useState("");

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
      if (open?.homeAside && !(e.target as HTMLElement).closest("#aside-menu")) {
        setOpen({ homeAside: false });
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
    // eslint-disable-next-line
  }, [open?.homeAside]);

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-[11] w-full max-w-96 bg-white p-5 font-semibold shadow-md transition-transform duration-300 ease-in-out ${
        open?.homeAside ? "translate-x-0" : "translate-x-full"
      }`}
      id="aside-menu"
    >
      <section className="flex items-center justify-between">
        <DetailedAvatar
          email={props.session?.user?.email ?? ""}
          name={props.session?.user?.name ?? ""}
          src={props.session?.user?.image ?? ""}
          status={props.session?.user?.status ?? ""}
        />

        <ExampleA color="rose" onClick={() => setOpen({ homeAside: false })} size="sm" variant="ghost">
          <IoClose size={30} />
        </ExampleA>
      </section>

      <div className="my-3 border-t border-gray-300" />

      <section>
        <ul className="space-y-2">
          {NAVIGATION_DATA.map((dt, i) => (
            <li key={i}>
              <Link
                className={`flex items-center gap-2 rounded-lg px-4 py-2 ${activeSection === dt.href.substring(1) ? "bg-rose-500 text-white" : "text-black hover:bg-rose-400 hover:text-white active:bg-rose-500"}`}
                href={dt.href}
                onClick={(e) => {
                  setOpen({ homeAside: false });
                  handleSmoothScroll(e, dt.href);
                }}
                prefetch={false}
              >
                {activeSection === dt.href.substring(1) ? <GoDotFill size={16} /> : <GoDot size={16} />}
                {dt.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="my-3 border-t border-gray-300" />

        <ul className="space-y-2">
          {props.session?.user?.status ? (
            <>
              <li>
                <Link
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-black hover:bg-rose-400 hover:text-white active:bg-rose-500"
                  href="/profile"
                  onClick={() => setOpen({ homeAside: false })}
                >
                  <FaUser size={16} />
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-black hover:bg-rose-400 hover:text-white active:bg-rose-500"
                  href={`/history/${props.session?.user?.username}`}
                  onClick={() => setOpen({ historyAsideSwitch: false, historyDetailSwitch: false, homeAside: false })}
                >
                  <FaHistory size={16} />
                  History
                </Link>
              </li>

              <li>
                <Link
                  className={`group flex items-center justify-between rounded-md px-4 py-2 ${
                    questionnaireConditions ? "text-black hover:bg-rose-400 hover:text-white active:bg-rose-500" : "cursor-not-allowed text-gray-400"
                  }`}
                  href={`/questionnaire`}
                  onClick={(e) => {
                    if (!questionnaireConditions) {
                      e.preventDefault();
                    } else {
                      setOpen({ homeAside: false });
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
                  onClick={() => {
                    setOpen({ homeAside: false });
                    signOut();
                  }}
                >
                  <FaSignOutAlt size={16} />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                className={ExampleATWM({ color: "rose", size: "sm", variant: "solid" })}
                href={"/authentication/login"}
                onClick={() => setOpen({ homeAside: false })}
              >
                LOGIN
              </Link>
            </li>
          )}
        </ul>
      </section>
    </aside>
  );
};
