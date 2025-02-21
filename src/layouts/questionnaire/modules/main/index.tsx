import { redirect } from "next/navigation";
import { FC, ReactElement } from "react";

import { getAllSession, questionnairesConditions } from "@/src/hooks";
import { GETDatasByDocumentId } from "@/src/utils";

import { Content } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();
  const response = await GETDatasByDocumentId(session?.user?.datasDocumentId ?? "");

  if (!questionnairesConditions(response)) {
    redirect("/");
  }

  return <Content session={session} />;
};
