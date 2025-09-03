import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren, ReactElement } from "react";
import { FaFileLines } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";

import logo from "@/public/assets/images/logos/Black.svg";
import { ExampleATWM, FormContainer } from "@/src/components";

type T = Readonly<PropsWithChildren>;

export const Content: FC<T> = (props): ReactElement => (
  <main className="bg-slate-100">
    <FormContainer className={{ innerContainer: "size-full gap-5" }} href="/" label="Home">
      <div
        // className={`size-full max-w-[400px] space-y-4 overflow-y-auto rounded-lg bg-rose-50 p-5 max-lg:mx-auto lg:block ${open?.historyAsideSwitch ? "hidden" : "block"}`}
        className="size-full max-w-[350px] rounded-lg bg-rose-50 p-5"
      >
        <div className="h-full space-y-3 rounded-md bg-white p-5">
          <div className="space-y-2 pb-1">
            <Image alt="Hastinulc Makeup Art" className="mx-auto" priority src={logo} width={200} />

            <div className="mx-auto h-px w-[90%] bg-rose-400" />
          </div>

          <Link
            className={ExampleATWM({ className: "justify-start rounded-lg", color: "rose", size: "sm", variant: "solid" })}
            href={"/admin/dashboard"}
          >
            <MdSpaceDashboard size={18} />
            Dashboard
          </Link>

          <Link
            className={ExampleATWM({ className: "justify-start rounded-lg", color: "rose", size: "sm", variant: "solid" })}
            href={"/admin/report"}
          >
            <FaFileLines size={16} />
            Report
          </Link>
        </div>
      </div>
      {props.children}
    </FormContainer>
  </main>
);
