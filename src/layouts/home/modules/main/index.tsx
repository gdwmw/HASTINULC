import { FC, PropsWithChildren, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { GETBooking } from "@/src/utils";

import { About, Contact, Home, Packages, Portfolio } from "./batches";

type T = Readonly<PropsWithChildren>;

export const Main: FC<T> = async (props): Promise<ReactElement> => {
  const session = await getAllSession();
  const fetchBooking = async () => {
    try {
      return await GETBooking();
    } catch {
      console.log("GETBooking Failed, Bypassed!");
      return null;
    }
  };

  return (
    <main>
      <Home response={await fetchBooking()} session={session} />
      <About />
      <Portfolio />
      <Packages />
      <Contact />
      {props.children}
    </main>
  );
};
