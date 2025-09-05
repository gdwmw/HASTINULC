import { Metadata, Viewport } from "next";
import { FC, ReactElement } from "react";

import ReviewsLayout from "@/src/layouts/admin/pages/reviews";

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "Reviews",
};

const ReviewsPage: FC = (): ReactElement => <ReviewsLayout />;

export default ReviewsPage;
