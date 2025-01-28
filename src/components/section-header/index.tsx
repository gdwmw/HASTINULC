import localFont from "next/font/local";
import { FC, ReactElement } from "react";

import { twm } from "@/src/libs/tailwind-merge";

const montaguSlab = localFont({ src: "../../app/fonts/montagu-slab/MontaguSlab-VariableFont_opsz,wght.ttf" });

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
  <div className={twm("w-full space-y-5", props.containerClassname)}>
    <p className={twm("-mb-2 font-semibold tracking-wider text-rose-500", props.subtitleClassname)}>{props.subtitle}</p>
    <h1 className={twm(`text-6xl ${montaguSlab.className}`, props.titleClassname)}>{props.title}</h1>
    {props.description && <p className={props.descriptionClassname}>{props.description}</p>}
  </div>
);
