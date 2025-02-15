import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks/session";
import { GETBookings } from "@/src/utils/api";

import { About, Contact, Home, Packages, Portfolio } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();
  const response = await GETBookings();

  return (
    <main>
      <Home response={response} session={session} />
      <About />
      <Portfolio />
      <Packages />
      <Contact />
    </main>
  );
};
