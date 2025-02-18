import { redirect } from "next/navigation";
import { FC, ReactElement } from "react";

import { questionnairesConditions } from "@/src/hooks/functions";
import { getAllSession } from "@/src/hooks/session";
import { GETDatasByDocumentId } from "@/src/utils/api";

import { Content } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();
  const response = await GETDatasByDocumentId(session?.user?.datasDocumentId ?? "");

  if (!questionnairesConditions(response)) {
    redirect("/");
  }

  return <Content session={session} />;
};
