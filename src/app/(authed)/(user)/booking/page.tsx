import { Metadata, Viewport } from "next";
import { FC, ReactElement } from "react";

import BookingLayout from "@/src/layouts/booking";

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "Booking",
};

const BookingPage: FC = (): ReactElement => <BookingLayout />;

export default BookingPage;
