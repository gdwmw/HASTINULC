import { Metadata, Viewport } from "next";
import { FC, ReactElement } from "react";

import HistoryLayout from "@/src/layouts/user/pages/history";

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "History",
};

interface I {
  params: Promise<{ slug: string[] }>;
}

const HistoryPage: FC<I> = async (props): Promise<ReactElement> => <HistoryLayout slug={props.params} />;

export default HistoryPage;
