import Link from "next/link";
import { FC, ReactElement, ReactNode } from "react";

interface I {
  icon: ReactNode;
  label: string;
  url: string;
}

export const ContactButton: FC<I> = (props): ReactElement => (
  <div className="flex items-center gap-2">
    <Link
      className="flex min-h-10 min-w-10 items-center justify-center rounded-full bg-rose-100 text-rose-500 hover:bg-rose-200 active:scale-95 active:bg-rose-100 active:text-rose-400"
      href={props.url}
      prefetch={false}
      target="_blank"
    >
      {props.icon}
    </Link>

    <Link
      className="-mt-0.5 inline-block text-2xl font-semibold text-rose-500 active:scale-95 active:text-rose-400"
      href={props.url}
      prefetch={false}
      target="_blank"
    >
      {props.label}
    </Link>
  </div>
);
