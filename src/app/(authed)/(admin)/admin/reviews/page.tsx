import { Metadata } from "next";
import { FC, ReactElement } from "react";

import ReviewsLayout from "@/src/layouts/admin/pages/reviews";

export const metadata: Metadata = {
  title: "Reviews",
};

const ReviewsPage: FC = (): ReactElement => <ReviewsLayout />;

export default ReviewsPage;
