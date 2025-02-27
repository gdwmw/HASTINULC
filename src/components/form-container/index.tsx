"use client";

import Link, { LinkProps } from "next/link";
import { FC, ReactElement, ReactNode } from "react";
import { FaChevronLeft, FaListAlt } from "react-icons/fa";

import { useGlobalStates } from "@/src/context";
import { twm } from "@/src/libs";

import { ExampleA, ExampleATWM } from "../interfaces";

interface I extends Omit<LinkProps, "href"> {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  href?: string;
  innerContainerClassName?: string;
  isBooking?: boolean;
  label?: string;
}

export const FormContainer: FC<I> = ({
  children,
  className,
  containerClassName,
  href,
  innerContainerClassName,
  isBooking,
  label,
  ...linkProps
}): ReactElement => {
  const { open, setOpen } = useGlobalStates();

  return (
    <section className={twm("container mx-auto flex h-svh items-center justify-center p-5", containerClassName)}>
      <div className={twm("relative flex rounded-xl bg-white px-5 pb-5 pt-[60px] shadow-lg", !href && "p-5", innerContainerClassName)}>
        {href && (
          <Link
            className={ExampleATWM({ className: `absolute left-5 top-5 font-semibold ${className}`, color: "rose", size: "sm", variant: "ghost" })}
            href={href}
            {...linkProps}
          >
            <FaChevronLeft className="ml-1" size={12} /> {label}
          </Link>
        )}

        {isBooking && (
          <>
            <span className="absolute left-[95px] top-5 text-rose-400 lg:hidden">|</span>

            <ExampleA
              className="absolute left-[108px] top-[22px] font-semibold lg:hidden"
              color="rose"
              onClick={() => setOpen({ ...open, bookingList: !open?.bookingList })}
              size="sm"
              variant="ghost"
            >
              <FaListAlt size={20} /> Booking List
            </ExampleA>
          </>
        )}

        {children}
      </div>
    </section>
  );
};
