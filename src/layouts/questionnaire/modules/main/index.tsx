import { redirect } from "next/navigation";
import { FC, ReactElement } from "react";

import { getAllSession, questionnaireConditions } from "@/src/hooks";
import { DUMMY_DATA_DATA } from "@/src/libs";
import { GETDataByDocumentId } from "@/src/utils";

import { Content } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();

  const fetchData = async () => {
    try {
      return await GETDataByDocumentId(session?.user?.dataDocumentId ?? "");
    } catch {
      console.warn("GETDataByDocumentId Failed, Bypassed!");
      return null;
    }
  };

  if (!questionnaireConditions({ data: session?.user?.role !== "demo" ? await fetchData() : DUMMY_DATA_DATA, session: session })) {
    redirect("/");
  }

  return <Content session={session} />;
};
