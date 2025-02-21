import { FC, PropsWithChildren, ReactElement } from "react";

import { twm } from "@/src/libs";

type T = {
  className?: string;
} & Readonly<PropsWithChildren>;

export const ExampleInputsContainer: FC<T> = (props): ReactElement => (
  <section className={twm("space-y-1", props.className)}>{props.children}</section>
);
