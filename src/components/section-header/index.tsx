import { FC, ReactElement } from "react";

import { twm } from "@/src/libs/tailwind-merge";

interface I {
  containerClassname?: string;
  description?: string;
  descriptionClassname?: string;
  subtitle: string;
  subtitleClassname?: string;
  title: string;
  titleClassname?: string;
}

export const SectionHeader: FC<I> = (props): ReactElement => (
  <header className={twm("w-full space-y-5", props.containerClassname)}>
    <span className={twm("-mb-2 font-semibold tracking-wider text-rose-500", props.subtitleClassname)}>{props.subtitle}</span>
    <h1 className={twm("font-montaguSlab text-6xl", props.titleClassname)}>{props.title}</h1>
    {props.description && <p className={props.descriptionClassname}>{props.description}</p>}
  </header>
);
