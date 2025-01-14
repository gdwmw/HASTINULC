import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks/session";

import { About, Home, Packages, Portfolio } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();

  return (
    <main>
      <Home session={session} />
      <About />
      <Portfolio />
      <Packages session={session} />
    </main>
  );
};
