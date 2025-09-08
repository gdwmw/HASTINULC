import { Metadata, Viewport } from "next";
import { FC, ReactElement } from "react";

import FeedbacksLayout from "@/src/layouts/admin/pages/feedbacks";

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "Feedbacks",
};

const FeedbacksPage: FC = (): ReactElement => <FeedbacksLayout />;

export default FeedbacksPage;
