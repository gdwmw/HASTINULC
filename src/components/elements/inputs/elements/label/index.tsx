import { FC, PropsWithChildren, ReactElement } from "react";
import { MdError } from "react-icons/md";

import { twm } from "@/src/libs";
import { TLabelColor } from "@/src/types";

export interface ILabel extends Readonly<PropsWithChildren> {
  className?: {
    fieldset?: string;
    legend?: string;
  };
  color: TLabelColor;
  disabled?: boolean;
  errorMessage?: string;
  label: string;
}

const FieldsetTWM = ({ className, color, disabled, errorMessage }: Omit<ILabel, "label">) => {
  const isActive = !disabled && !errorMessage;
  const isError = errorMessage && !disabled;

  return twm(
    "group overflow-hidden rounded-md border-2 px-1 pb-2",
    disabled ? "border-gray-200" : "border-gray-200 dark:border-white",
    isActive && color === "rose" && "focus-within:border-rose-400 hover:border-rose-300",
    isActive && color === "emerald" && "focus-within:border-emerald-400 hover:border-emerald-300",
    isError && "border-red-200 focus-within:border-red-400 hover:border-red-300",
    className?.fieldset,
  );
};

const LegendTWM = ({ className, color, disabled, errorMessage }: Omit<ILabel, "label">) => {
  const isActive = !disabled && !errorMessage;
  const isError = errorMessage && !disabled;

  return twm(
    "ml-3 flex select-none items-center gap-1 whitespace-nowrap px-1 text-xs font-semibold",
    disabled ? "text-gray-400" : "dark:text-white",
    isActive && color === "rose" && "group-focus-within:text-rose-500",
    isActive && color === "emerald" && "group-focus-within:text-emerald-500",
    isError && "text-red-600",
    className?.legend,
  );
};

export const Label: FC<ILabel> = ({ className, color, disabled, errorMessage, label, ...props }): ReactElement => (
  <fieldset className={FieldsetTWM({ className, color, disabled, errorMessage })} data-testid="label-fieldset">
    <legend className={LegendTWM({ className, color, disabled, errorMessage })} data-testid="label-legend">
      {label}
      {errorMessage && !disabled && <MdError className="text-red-600" data-testid="label-icon" />}
    </legend>

    <div className="flex items-center justify-center">{props.children}</div>
  </fieldset>
);
