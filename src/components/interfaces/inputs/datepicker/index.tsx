"use client";

import { FC, ReactElement } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";

import { twm } from "@/src/libs";

import { ErrorMessage, InputsContainer, Label } from "../elements";

import "@/src/styles/datepicker.css";

/* eslint-disable perfectionist/sort-union-types */
type TDatePicker = {
  className?: string;
  color?: "rose" | "emerald";
  containerClassName?: string;
  disabled?: boolean;
  errorMessage?: string;
  fieldsetClassName?: string;
  label?: string;
  legendClassName?: string;
} & DatePickerProps;
/* eslint-enable perfectionist/sort-union-types */

const DatePickerTWM = ({ className, disabled }: TDatePicker) =>
  twm(
    "w-full rounded-lg bg-transparent px-2 outline-none disabled:cursor-not-allowed",
    disabled ? "text-gray-400" : "text-gray-800 hover:bg-gray-50 focus:bg-gray-50",
    className,
  );

export const DatePickerInput: FC<TDatePicker> = ({
  className,
  color,
  containerClassName,
  disabled,
  errorMessage,
  fieldsetClassName,
  label,
  legendClassName,
  ...props
}): ReactElement => (
  <InputsContainer className={containerClassName}>
    <Label
      color={color}
      disabled={disabled}
      errorMessage={errorMessage}
      fieldsetClassName={fieldsetClassName}
      label={label}
      legendClassName={legendClassName}
    >
      <DatePicker className={DatePickerTWM({ className, disabled })} data-testid="datepicker" disabled={disabled} {...props} />
    </Label>

    {errorMessage && !disabled && <ErrorMessage errorMessage={errorMessage} />}
  </InputsContainer>
);

DatePickerInput.displayName = "DatePickerInput";
