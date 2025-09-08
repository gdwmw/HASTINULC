import { Viewport } from "next";
import { FC, PropsWithChildren, ReactElement } from "react";

import GlobalAdminLayout from "@/src/layouts/admin/global";

export const viewport: Viewport = {
  initialScale: 0.5,
  width: "device-width",
};

type T = Readonly<PropsWithChildren>;

const Layout: FC<T> = (props): ReactElement => <GlobalAdminLayout>{props.children}</GlobalAdminLayout>;

export default Layout;
