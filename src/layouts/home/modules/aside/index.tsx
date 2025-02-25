import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { GETDatasByDocumentId } from "@/src/utils";

import { Content } from "./batches";

export const ASide: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();
  const fetchDatas = async () => {
    if (session?.user?.datasDocumentId) {
      try {
        const res = await GETDatasByDocumentId(session?.user?.datasDocumentId);
        return res;
      } catch {
        console.log("GETDatas Failed, Bypassed!");
        return null;
      }
    }
  };
  return <Content response={await fetchDatas()} session={session} />;
};
