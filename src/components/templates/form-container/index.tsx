"use client";

import Link, { LinkProps } from "next/link";
import { FC, ReactElement, ReactNode } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

import { useGlobalStates } from "@/src/context";
import { twm } from "@/src/libs";

import { ExampleA, ExampleATWM } from "../..";

interface I extends Omit<LinkProps, "href"> {
  children: ReactNode;
  className?: {
    container?: string;
    innerContainer?: string;
    link?: string;
  };
  container?: boolean;
  href: string;
  isSwitcher?: boolean;
  label: string;
}

export const FormContainer: FC<I> = ({ children, className, container = true, href, isSwitcher, label, ...props }): ReactElement => {
  const { open, setOpen } = useGlobalStates();

  return (
    <section className={twm(`flex h-dvh items-center justify-center p-5 ${container && "container mx-auto"}`, className?.container)}>
      <div
        className={twm(
          "relative flex rounded-xl bg-white px-5 pb-5 pt-[60px] shadow-lg dark:bg-black dark:text-white dark:shadow-white/10",
          !href && "p-5",
          className?.innerContainer,
        )}
      >
        <div className={`absolute left-5 top-5 flex items-center gap-3 font-semibold ${className?.link}`}>
          {href && (
            <Link
              className={ExampleATWM({
                color: "rose",
                size: "sm",
                variant: "ghost",
              })}
              href={href}
              {...props}
            >
              <FaChevronLeft className="ml-1" size={12} /> {label}
            </Link>
          )}

          {isSwitcher && (
            <>
              <span className="block text-rose-400 lg:hidden">|</span>

              <ExampleA
                className="flex items-center gap-1 lg:hidden"
                color="rose"
                onClick={() => setOpen({ adminAside: !open?.adminAside, historyAsideSwitch: !open?.historyAsideSwitch })}
                size="sm"
                variant="ghost"
              >
                Open{" "}
                {open?.historyAsideSwitch ? (
                  <TbLayoutSidebarLeftExpandFilled className="-mb-1" size={20} />
                ) : (
                  <TbLayoutSidebarRightExpandFilled className="-mb-1" size={20} />
                )}
              </ExampleA>
            </>
          )}
        </div>

        {children}
      </div>
    </section>
  );
};
