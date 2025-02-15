import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks/session";
import { GETBookings } from "@/src/utils/api";

import { About, Contact, Home, Packages, Portfolio } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();
  const fetchBookings = async () => {
    try {
      const response = await GETBookings();
      return response;
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
