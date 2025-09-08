import { Metadata } from "next";
import { FC, ReactElement } from "react";

import BookingsLayout from "@/src/layouts/admin/pages/bookings";

export const metadata: Metadata = {
  title: "Bookings",
};

const BookingsPage: FC = (): ReactElement => <BookingsLayout />;

export default BookingsPage;
