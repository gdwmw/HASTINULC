import Link from "next/link";
import { FC, PropsWithChildren, ReactElement } from "react";

import { ExampleATWM, FormContainer } from "@/src/components";

type T = Readonly<PropsWithChildren>;

export const Content: FC<T> = (props): ReactElement => (
  <main className="bg-slate-100">
    <FormContainer className={{ innerContainer: "size-full gap-5" }} href="/" label="Home">
      <div
        // className={`size-full max-w-[400px] space-y-4 overflow-y-auto rounded-lg bg-rose-50 p-5 max-lg:mx-auto lg:block ${open?.historyAsideSwitch ? "hidden" : "block"}`}
        className={`size-full max-w-[400px] space-y-4 overflow-y-auto rounded-lg bg-rose-50 p-5 max-lg:mx-auto lg:block`}
      >
        <Link className={ExampleATWM({ color: "rose", size: "sm", variant: "solid" })} href={"/admin/dashboard"}>
          Dashboard
        </Link>
        <Link className={ExampleATWM({ color: "rose", size: "sm", variant: "solid" })} href={"/admin/report"}>
          Report
        </Link>
      </div>
      {props.children}
    </FormContainer>
  </main>
);
