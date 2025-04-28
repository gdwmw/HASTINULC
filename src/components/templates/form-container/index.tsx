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
  href: string;
  isHistory?: boolean;
  label: string;
}

export const FormContainer: FC<I> = ({ children, className, href, isHistory, label, ...props }): ReactElement => {
  const { open, setOpen } = useGlobalStates();

  return (
    <section className={twm("container mx-auto flex h-svh items-center justify-center p-5", className?.container)}>
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

          {isHistory && (
            <>
              <span className="block text-rose-400 lg:hidden">|</span>

              <ExampleA
                className="flex items-center gap-1 lg:hidden"
                color="rose"
                onClick={() => setOpen({ bookingList: !open?.bookingList })}
                size="sm"
                variant="ghost"
              >
                Open{" "}
                {open?.bookingList ? (
                  <TbLayoutSidebarRightExpandFilled className="-mb-1" size={20} />
                ) : (
                  <TbLayoutSidebarLeftExpandFilled className="-mb-1" size={20} />
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
