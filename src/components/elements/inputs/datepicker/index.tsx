"use client";

import { FC, ReactElement } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";

import { twm } from "@/src/libs";

import { ErrorMessage, ILabel, InputsContainer, Label } from "../elements";

import "@/src/styles/datepicker.css";

interface I extends Omit<DatePickerProps, "className">, Omit<ILabel, "children" | "className"> {
  className?: {
    container?: string;
    datepicker?: string;
  } & ILabel["className"];
}

const DatePickerTWM = ({ className, disabled }: Omit<I, "color" | "label">) =>
  twm("w-full rounded-sm bg-transparent px-1 outline-none disabled:cursor-not-allowed", disabled && "text-gray-400", className?.datepicker);

export const DatePickerInput: FC<I> = ({ className, color, disabled, errorMessage, label, ...props }): ReactElement => (
  <InputsContainer className={className?.container}>
    <Label
      className={{ fieldset: className?.fieldset, legend: className?.legend }}
      color={color}
      disabled={disabled}
      errorMessage={errorMessage}
      label={label}
    >
      <DatePicker className={DatePickerTWM({ className, disabled })} disabled={disabled} {...(props as DatePickerProps)} />
    </Label>

    {errorMessage && !disabled && <ErrorMessage errorMessage={errorMessage} />}
  </InputsContainer>
);

DatePickerInput.displayName = "DatePickerInput";
