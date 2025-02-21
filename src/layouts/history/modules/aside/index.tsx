import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks/session";

import { Content } from "./batches";

interface I {
  slug: Promise<{ slug: string[] }>;
}

export const ASide: FC<I> = async (props): Promise<ReactElement> => {
  const slug = (await props.slug).slug;
  const session = await getAllSession();

  return <Content session={session} slug={slug} />;
};
