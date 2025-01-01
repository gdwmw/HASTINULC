import { FC, ReactElement } from "react";

export const Main: FC = (): ReactElement => (
  <main>
    <section className="h-screen w-screen bg-slate-200" id="home"></section>
    <section className="h-screen w-screen scroll-mt-[88px] bg-slate-300" id="about"></section>
  </main>
);
