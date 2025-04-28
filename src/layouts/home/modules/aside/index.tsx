import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { GETDataByDocumentId } from "@/src/utils";

import { Content } from "./batches";

export const ASide: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();
  const fetchData = async () => {
    if (session?.user?.dataDocumentId) {
      try {
        return await GETDataByDocumentId(session?.user?.dataDocumentId);
      } catch {
        console.log("GETDataByDocumentId Failed, Bypassed!");
        return null;
      }
    }
  };

  return <Content response={await fetchData()} session={session} />;
};
