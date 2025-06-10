import { FC, PropsWithChildren, ReactElement } from "react";

import { Main } from "./modules";

type T = Readonly<PropsWithChildren>;

const GlobalAdminLayout: FC<T> = (props): ReactElement => <Main>{props.children}</Main>;

export default GlobalAdminLayout;
