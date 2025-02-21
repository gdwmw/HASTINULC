import { Metadata, Viewport } from "next";
import { FC, ReactElement } from "react";

import ReviewLayout from "@/src/layouts/review";

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "Review",
};

interface I {
  params: Promise<{ slug: string[] }>;
}

const ReviewPage: FC<I> = async (props): Promise<ReactElement> => <ReviewLayout slug={props.params} />;

export default ReviewPage;
