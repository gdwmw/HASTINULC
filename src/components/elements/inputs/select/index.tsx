"use client";

import { DetailedHTMLProps, FC, forwardRef, ReactElement, SelectHTMLAttributes } from "react";

import { twm } from "@/src/libs";

import { ErrorMessage, ILabel, InputsContainer, Label } from "../";

interface I
  extends DetailedHTMLProps<Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "color">, HTMLSelectElement>,
    Omit<ILabel, "children" | "className"> {
  className?: {
    container?: string;
    select?: string;
  } & ILabel["className"];
}

const SelectTWM = ({ className, disabled }: Omit<I, "color" | "label">) =>
  twm("w-full rounded-sm bg-transparent px-1 outline-none disabled:cursor-not-allowed", disabled && "text-gray-400", className?.select);

export const Select: FC<I> = forwardRef<HTMLSelectElement, I>(
  ({ className, color, disabled, errorMessage, label, ...props }, ref): ReactElement => (
    <InputsContainer className={className?.container}>
      <Label
        className={{ fieldset: className?.fieldset, legend: className?.legend }}
        color={color}
        disabled={disabled}
        errorMessage={errorMessage}
        label={label}
      >
        <select className={SelectTWM({ className, disabled })} data-testid="select" disabled={disabled} ref={ref} {...props}>
          {props.children}
        </select>
      </Label>

      {errorMessage && !disabled && <ErrorMessage errorMessage={errorMessage} />}
    </InputsContainer>
  ),
);

Select.displayName = "Select";
