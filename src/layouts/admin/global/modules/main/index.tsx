import { FC, PropsWithChildren, ReactElement } from "react";

import { Content } from "./batches";

type T = Readonly<PropsWithChildren>;

export const Main: FC<T> = (props): ReactElement => <Content>{props.children}</Content>;
