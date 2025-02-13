import { FC, PropsWithChildren, ReactElement } from "react";

type T = Readonly<PropsWithChildren>;

export const Header: FC<T> = (props): ReactElement => <header className="sticky inset-x-0 top-0 z-10">{props.children}</header>;
