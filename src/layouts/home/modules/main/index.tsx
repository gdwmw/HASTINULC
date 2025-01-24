import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks/session";

import { About, Contact, Home, Packages, Portfolio } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();

  return (
    <main>
      <Home session={session} />
      <About />
      <Portfolio />
      <Packages />
      <Contact />
    </main>
  );
};
