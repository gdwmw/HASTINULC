import { FC, ReactElement } from "react";

import { twm } from "@/src/libs";

interface I {
  containerClassName?: string;
  description?: string;
  descriptionClassName?: string;
  subtitle: string;
  subtitleClassName?: string;
  title: string;
  titleClassName?: string;
}

export const SectionHeader: FC<I> = (props): ReactElement => (
  <header className={twm("w-full space-y-5", props.containerClassName)}>
    <span className={twm("-mb-2 font-semibold tracking-wider text-rose-500", props.subtitleClassName)}>{props.subtitle}</span>
    <h1 className={twm("font-montaguSlab text-6xl", props.titleClassName)}>{props.title}</h1>
    {props.description && <p className={props.descriptionClassName}>{props.description}</p>}
  </header>
);
