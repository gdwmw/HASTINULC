import { Metadata } from "next";
import { FC, ReactElement } from "react";

import DashboardLayout from "@/src/layouts/admin/pages/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage: FC = (): ReactElement => <DashboardLayout />;

export default DashboardPage;
