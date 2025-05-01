import { FC, PropsWithChildren, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { GETBooking } from "@/src/utils";

import { About, Contact, Home, Packages, Portfolio } from "./batches";

type T = Readonly<PropsWithChildren>;

export const Main: FC<T> = async (props): Promise<ReactElement> => {
  const session = await getAllSession();

  const fetchBooking = async () => {
    try {
      const res = await GETBooking();
      return res.data;
    } catch {
      console.warn("GETBooking Failed, Bypassed!");
      return null;
    }
  };

  return (
    <main>
      <Home response={session?.user?.role !== "demo" ? await fetchBooking() : undefined} session={session} />
      <About />
      <Portfolio />
      <Packages />
      <Contact />
      {props.children}
    </main>
  );
};
