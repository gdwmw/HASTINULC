import { DetailedHTMLProps, FC, HTMLAttributes, ReactElement } from "react";

import { twm } from "@/src/libs/tailwind-merge";

type TExampleBContainer = { className?: string } & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
type TExampleBIcon = { className?: string } & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
type TExampleBText = { className?: string } & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export const ExampleBContainer: FC<TExampleBContainer> = ({ className, ...props }): ReactElement => (
  <section className={twm("flex max-w-52 flex-col items-center text-center", className)} data-testid="example-b-container" {...props}>
    {props.children}
  </section>
);

export const ExampleBIcon: FC<TExampleBIcon> = ({ className, ...props }): ReactElement => (
  <span className={twm("flex size-20 items-center justify-center", className)} data-testid="example-b-icon" {...props}>
    {props.children}
  </span>
);

export const ExampleBText: FC<TExampleBText> = ({ className, ...props }): ReactElement => (
  <span className={twm("font-semibold", className)} data-testid="example-b-text" {...props}>
    {props.children}
  </span>
);
