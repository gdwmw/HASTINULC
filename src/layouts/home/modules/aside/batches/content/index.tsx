"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { FaClipboardList, FaHistory, FaSignOutAlt, FaUser } from "react-icons/fa";
import { GoDot, GoDotFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";

import { ExampleA, ExampleATWM } from "@/src/components";
import { useGlobalStates } from "@/src/context";
import { questionnairesConditions as conditions } from "@/src/hooks";
import { NAVIGATION_DATA } from "@/src/libs";
import { IDatasResponse } from "@/src/types";

interface I {
  response: IDatasResponse | null | undefined;
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const { open, setOpen } = useGlobalStates();
  const [activeSection, setActiveSection] = useState("");

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
      if (open?.aside && !(e.target as HTMLElement).closest("#aside-menu")) {
        setOpen({ aside: false });
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
    // eslint-disable-next-line
  }, [open?.aside]);

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-[11] w-full max-w-96 bg-white p-5 font-semibold shadow-md transition-transform duration-300 ease-in-out ${
        open?.aside ? "translate-x-0" : "translate-x-full"
      }`}
      id="aside-menu"
    >
      <section className="flex items-center justify-between">
        {props.session?.user?.status ? (
          <figure className="flex items-center gap-2">
            {props.session?.user?.image ? (
              <div className="relative aspect-square size-fit min-h-[50px] min-w-[50px] overflow-hidden rounded-full border border-gray-200">
                <Image alt="Profile Image" className="object-cover" fill quality={30} src={props.session?.user?.image ?? ""} />
              </div>
            ) : (
              <div className="flex aspect-square size-fit min-h-[50px] min-w-[50px] items-center justify-center rounded-full border border-gray-200 bg-gray-100">
                <FaUser className="text-gray-400" size={25} />
              </div>
            )}
            <figcaption>
              <div className="-mb-1.5 mt-[-5px] line-clamp-1">
                <span className="text-lg">{props.session?.user?.name}</span>
              </div>
              <span className="block text-xs text-rose-500">{props.session?.user?.username}</span>
            </figcaption>
          </figure>
        ) : (
          <figure className="flex items-center gap-2">
            <div className="flex aspect-square size-fit min-h-[50px] min-w-[50px] items-center justify-center rounded-full border border-gray-200 bg-gray-100">
              <FaUser className="text-gray-400" size={25} />
            </div>
            <figcaption>
              <span className="-mb-1.5 mt-[-5px] block text-lg">Guest</span>
              <span className="block text-xs text-gray-400">Not logged in</span>
            </figcaption>
          </figure>
        )}

        <ExampleA color="rose" onClick={() => setOpen({ aside: false })} size="sm" variant="ghost">
          <IoClose size={30} />
        </ExampleA>
      </section>

      <div className="my-3 border-t border-gray-300" />

      <section>
        <ul className="space-y-2">
          {NAVIGATION_DATA.map((dt) => (
            <li key={dt.id}>
              <Link
                className={`flex items-center gap-2 rounded-lg px-4 py-2 ${activeSection === dt.href.substring(1) ? "bg-rose-500 text-white" : "text-black hover:bg-rose-400 hover:text-white active:bg-rose-500"}`}
                href={dt.href}
                onClick={(e) => {
                  setOpen({ aside: false });
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
                  onClick={() => setOpen({ aside: false })}
                >
                  <FaUser size={16} />
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-black hover:bg-rose-400 hover:text-white active:bg-rose-500"
                  href={`/history/${props.session?.user?.username}`}
                  onClick={() => setOpen({ aside: false, bookingList: true, bookingSummary: true })}
                >
                  <FaHistory size={16} />
                  History
                </Link>
              </li>

              <li>
                <Link
                  className={`group flex items-center justify-between rounded-md px-4 py-2 ${
                    questionnairesConditions ? "text-black hover:bg-rose-400 hover:text-white active:bg-rose-500" : "cursor-not-allowed text-gray-400"
                  }`}
                  href={`/questionnaire`}
                  onClick={(e) => {
                    if (!questionnairesConditions) {
                      e.preventDefault();
                    } else {
                      setOpen({ aside: false });
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FaClipboardList size={16} />
                    <span>Questionnaire</span>
                  </div>
                  {questionnairesConditions && (
                    <div className="relative mt-[2px] flex size-2">
                      <div className="absolute size-full animate-ping rounded-full bg-rose-400 opacity-75 group-hover:bg-white" />
                      <div className="size-2 rounded-full bg-rose-500 group-hover:bg-white" />
                    </div>
                  )}
                </Link>
              </li>

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
            </>
          ) : (
            <li>
              <Link className={ExampleATWM({ color: "rose", size: "sm", variant: "solid" })} href={"/authentication/login"}>
                LOGIN
              </Link>
            </li>
          )}
        </ul>
      </section>
    </aside>
  );
};
