import { FC, PropsWithChildren, ReactElement } from "react";

import GlobalHistoryLayout from "@/src/layouts/history/global";

type T = Readonly<PropsWithChildren>;

const Layout: FC<T> = (props): ReactElement => <GlobalHistoryLayout>{props.children}</GlobalHistoryLayout>;

export default Layout;
