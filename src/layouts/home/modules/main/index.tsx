import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks/session";

import { Home } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();

  return (
    <main>
      <Home session={session} />
      <section className="h-screen w-full scroll-mt-[88px] bg-slate-300" id="about"></section>
    </main>
  );
};
