import { Metadata } from "next";
import { FC, ReactElement } from "react";

import ReportLayout from "@/src/layouts/admin/pages/report";

export const metadata: Metadata = {
  title: "Report",
};

const ReportPage: FC = (): ReactElement => <ReportLayout />;

export default ReportPage;
