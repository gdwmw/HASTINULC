import { FC, ReactElement } from "react";

import { twm } from "@/src/libs";

interface I {
  className?: {
    container?: string;
    description?: string;
    subtitle?: string;
    title?: string;
  };
  description: string;
  subtitle: string;
  title: string;
}

export const SectionHeader: FC<I> = (props): ReactElement => (
  <header className={twm("w-full space-y-5", props.className?.container)}>
    <span className={twm("-mb-2 font-semibold tracking-wider text-rose-500", props.className?.subtitle)}>{props.subtitle}</span>
    <h1 className={twm("font-montaguSlab text-6xl", props.className?.title)}>{props.title}</h1>
    {props.description && <p className={props.className?.description}>{props.description}</p>}
  </header>
);
