import { Metadata } from "next";
import { FC, ReactElement } from "react";

import FeedbacksLayout from "@/src/layouts/admin/pages/feedbacks";

export const metadata: Metadata = {
  title: "Feedbacks",
};

const FeedbacksPage: FC = (): ReactElement => <FeedbacksLayout />;

export default FeedbacksPage;
