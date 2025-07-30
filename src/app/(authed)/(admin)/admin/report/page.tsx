import { Metadata, Viewport } from "next";
import { FC, ReactElement } from "react";

import ReportLayout from "@/src/layouts/admin/pages/report";

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "Report",
};

const ReportPage: FC = (): ReactElement => <ReportLayout />;

export default ReportPage;
