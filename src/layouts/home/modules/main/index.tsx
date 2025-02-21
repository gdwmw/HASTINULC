import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { GETBookings } from "@/src/utils/api";

import { About, Contact, Home, Packages, Portfolio } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();
  const fetchBookings = async () => {
    try {
      const res = await GETBookings();
      return res;
    } catch {
      console.log("GETBookings Failed, Bypassed!");
      return null;
    }
  };

  return (
    <main>
      <Home response={await fetchBookings()} session={session} />
      <About />
      <Portfolio />
      <Packages />
      <Contact />
    </main>
  );
};
