import { redirect } from "next/navigation";
import { FC, ReactElement } from "react";

import { getAllSession, questionnairesConditions } from "@/src/hooks";
import { DUMMY_DATAS_DATA } from "@/src/libs";
import { IDatasResponse } from "@/src/types";
import { GETDatasByDocumentId } from "@/src/utils";

import { Content } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();
  const fetchDatas = async () => {
    try {
      return await GETDatasByDocumentId(session?.user?.datasDocumentId ?? "");
    } catch {
      console.log("GETDatasByDocumentId Failed, Bypassed!");
      return null;
    }
  };

  if (
    !questionnairesConditions({ data: session?.user?.role === "demo" ? (DUMMY_DATAS_DATA as IDatasResponse) : await fetchDatas(), session: session })
  ) {
    redirect("/");
  }

  return <Content session={session} />;
};
