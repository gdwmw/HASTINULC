import { FC, PropsWithChildren, ReactElement } from "react";
import { MdError } from "react-icons/md";

import { twm } from "@/src/libs";

/* eslint-disable perfectionist/sort-union-types */
interface I extends Readonly<PropsWithChildren> {
  color?: "rose" | "emerald";
  disabled?: boolean;
  errorMessage?: string;
  fieldsetClassName?: string;
  label?: string;
  legendClassName?: string;
}
/* eslint-enable perfectionist/sort-union-types */

const FieldsetTWM = ({ color, disabled, errorMessage, fieldsetClassName }: I) =>
  twm(
    "group overflow-hidden rounded-lg border-2 px-1 pb-2",
    color === "rose" && !errorMessage && !disabled && "border-gray-200 focus-within:border-rose-400 hover:border-rose-300",
    color === "emerald" && !errorMessage && !disabled && "border-gray-200 focus-within:border-emerald-400 hover:border-emerald-300",
    errorMessage && !disabled && "border-red-200 focus-within:border-red-400 hover:border-red-300",
    disabled && "border-gray-200",
    fieldsetClassName,
  );

const LegendTWM = ({ color, disabled, errorMessage, legendClassName }: I) =>
  twm(
    "ml-2 flex select-none items-center gap-1 whitespace-nowrap px-1 text-sm font-medium",
    color === "rose" && !errorMessage && !disabled && "text-gray-600 group-focus-within:text-rose-500",
    color === "emerald" && !errorMessage && !disabled && "text-gray-600 group-focus-within:text-emerald-500",
    errorMessage && !disabled && "text-red-600 group-focus-within:text-red-600",
    disabled && "text-gray-400",
    legendClassName,
  );

export const Label: FC<I> = ({ color, disabled, errorMessage, fieldsetClassName, label, legendClassName, ...props }): ReactElement => (
  <fieldset className={FieldsetTWM({ color, disabled, errorMessage, fieldsetClassName })} data-testid="example-label-fieldset">
    <legend className={LegendTWM({ color, disabled, errorMessage, legendClassName })} data-testid="example-label-legend">
      {label}
      {errorMessage && !disabled && <MdError className="text-red-600" data-testid="example-label-icon" />}
    </legend>

    <div className="flex items-center justify-center">{props.children}</div>
  </fieldset>
);
