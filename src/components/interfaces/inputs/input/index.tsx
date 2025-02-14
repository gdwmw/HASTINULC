"use client";

import { DetailedHTMLProps, FC, forwardRef, InputHTMLAttributes, ReactElement, ReactNode } from "react";

import { twm } from "@/src/libs/tailwind-merge";

import { ExampleA } from "../../example/A";
import { ErrorMessage, InputsContainer, Label } from "../elements";

/* eslint-disable perfectionist/sort-union-types */
type TInput = {
  className?: string;
  color?: "rose" | "emerald";
  containerClassName?: string;
  disabled?: boolean;
  errorMessage?: string;
  fieldsetClassName?: string;
  icon?: ReactNode;
  iconOnClick?: () => void;
  label?: string;
  legendClassName?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
/* eslint-enable perfectionist/sort-union-types */

const InputTWM = ({ className, disabled }: TInput) =>
  twm(
    "w-full rounded-lg bg-transparent px-2 outline-none disabled:cursor-not-allowed",
    disabled ? "text-gray-400" : "text-gray-800 hover:bg-gray-50 focus:bg-gray-50",
    className,
  );

export const Input: FC<TInput> = forwardRef<HTMLInputElement, TInput>(
  (
    { className, color, containerClassName, disabled, errorMessage, fieldsetClassName, icon, iconOnClick, label, legendClassName, ...props },
    ref,
  ): ReactElement => (
    <InputsContainer className={containerClassName}>
      <Label
        color={color}
        disabled={disabled}
        errorMessage={errorMessage}
        fieldsetClassName={fieldsetClassName}
        label={label}
        legendClassName={legendClassName}
      >
        <input className={InputTWM({ className, disabled })} data-testid="input" disabled={disabled} ref={ref} {...props} />

        {icon && (
          <ExampleA
            className={`pr-1 ${!disabled && "text-inherit"} ${errorMessage ? "hover:text-red-600 active:text-red-700" : ""}`}
            color={color}
            disabled={disabled}
            onClick={iconOnClick}
            size="sm"
            type="button"
            variant="ghost"
          >
            {icon}
          </ExampleA>
        )}
      </Label>

      {errorMessage && !disabled && <ErrorMessage errorMessage={errorMessage} />}
    </InputsContainer>
  ),
);

Input.displayName = "Input";
