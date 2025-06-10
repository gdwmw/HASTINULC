import { FC, PropsWithChildren, ReactElement } from "react";

import GlobalAdminLayout from "@/src/layouts/admin/global";

type T = Readonly<PropsWithChildren>;

const Layout: FC<T> = (props): ReactElement => <GlobalAdminLayout>{props.children}</GlobalAdminLayout>;

export default Layout;
