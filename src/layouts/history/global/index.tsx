import { FC, PropsWithChildren, ReactElement } from "react";

import { Main } from "./modules";

type T = Readonly<PropsWithChildren>;

export const GlobalHistoryLayout: FC<T> = (props): ReactElement => <Main>{props.children}</Main>;
