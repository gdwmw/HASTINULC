import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks/session";

import { About, Home } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();

  return (
    <main>
      <Home session={session} />
      <About />
    </main>
  );
};
