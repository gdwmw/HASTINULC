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
      console.log("GETDataByDocumentId Failed, Bypassed!");
      return null;
    }
  };

  if (!questionnaireConditions({ data: session?.user?.role === "demo" ? DUMMY_DATA_DATA : await fetchData(), session: session })) {
    redirect("/");
  }

  return <Content session={session} />;
};
