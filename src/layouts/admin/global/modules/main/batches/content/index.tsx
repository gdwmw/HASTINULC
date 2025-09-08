"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren, ReactElement } from "react";
import { FaClipboardList } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { MdMessage, MdSpaceDashboard } from "react-icons/md";

import logo from "@/public/assets/images/logos/Black.svg";
import { ExampleATWM, FormContainer } from "@/src/components";
import { useGlobalStates } from "@/src/context";

type T = Readonly<PropsWithChildren>;

export const Content: FC<T> = (props): ReactElement => {
  const pathname = usePathname().slice(7);
  const { open, setOpen } = useGlobalStates();

  return (
    <main className="bg-slate-100">
      <FormContainer className={{ innerContainer: "size-full max-h-[821px] gap-5" }} href="/" isSwitcher label="Home">
        <div className={`size-full rounded-lg bg-rose-50 p-5 lg:min-w-[350px] lg:max-w-[350px] ${open?.adminAside ? "max-lg:hidden" : ""}`}>
          <div className="h-full space-y-3 rounded-md bg-white p-5">
            <div className="space-y-2 pb-1">
              <Image alt="Hastinulc Makeup Art" className="mx-auto" priority src={logo} width={200} />

              <div className="mx-auto h-px w-[90%] bg-rose-400" />
            </div>

            <Link
              className={ExampleATWM({
                className: "justify-start rounded-lg",
                color: "rose",
                size: "sm",
                variant: pathname === "dashboard" ? "solid" : "outline",
              })}
              href={"/admin/dashboard"}
              onClick={() => setOpen({ adminAside: true })}
            >
              <div className="w-full max-w-[16px]">
                <MdSpaceDashboard size={18} />
              </div>
              Dashboard
            </Link>

            <Link
              className={ExampleATWM({
                className: "justify-start rounded-lg",
                color: "rose",
                size: "sm",
                variant: pathname === "bookings" ? "solid" : "outline",
              })}
              href={"/admin/bookings"}
              onClick={() => setOpen({ adminAside: true })}
            >
              <div className="w-full max-w-[16px]">
                <FaClipboardList size={18} />
              </div>
              Bookings
            </Link>

            <Link
              className={ExampleATWM({
                className: "justify-start rounded-lg",
                color: "rose",
                size: "sm",
                variant: pathname === "reviews" ? "solid" : "outline",
              })}
              href={"/admin/reviews"}
              onClick={() => setOpen({ adminAside: true })}
            >
              <div className="w-full max-w-[16px]">
                <IoStar size={18} />
              </div>
              Reviews
            </Link>

            <Link
              className={ExampleATWM({
                className: "justify-start rounded-lg",
                color: "rose",
                size: "sm",
                variant: pathname === "feedbacks" ? "solid" : "outline",
              })}
              href={"/admin/feedbacks"}
              onClick={() => setOpen({ adminAside: true })}
            >
              <div className="w-full max-w-[16px]">
                <MdMessage size={18} />
              </div>
              Feedbacks
            </Link>

            <Link
              className={ExampleATWM({
                className: "justify-start rounded-lg",
                color: "rose",
                size: "sm",
                variant: pathname === "report" ? "solid" : "outline",
              })}
              href={"/admin/report"}
              onClick={() => setOpen({ adminAside: true })}
            >
              <div className="w-full max-w-[16px]">
                <FaFileLines size={18} />
              </div>
              Report
            </Link>
          </div>
        </div>

        <aside className={`grow space-y-5 overflow-y-auto ${open?.adminAside ? "" : "max-lg:hidden"}`}>{props.children}</aside>
      </FormContainer>
    </main>
  );
};
