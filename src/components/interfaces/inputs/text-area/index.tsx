import { DetailedHTMLProps, FC, forwardRef, ReactElement, TextareaHTMLAttributes } from "react";

import { twm } from "@/src/libs";

import { ErrorMessage, InputsContainer, Label } from "../elements";

/* eslint-disable perfectionist/sort-union-types */
type TTextArea = {
  className?: string;
  color?: "rose" | "emerald";
  containerClassName?: string;
  disabled?: boolean;
  errorMessage?: string;
  fieldsetClassName?: string;
  label?: string;
  legendClassName?: string;
  rows?: number;
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
/* eslint-enable perfectionist/sort-union-types */

const TextAreaTWM = ({ className, disabled }: TTextArea) =>
  twm(
    "max-h-[200px] min-h-[120px] w-full rounded-lg bg-transparent px-2 outline-none disabled:cursor-not-allowed",
    disabled ? "text-gray-400" : "text-gray-800 hover:bg-gray-50 focus:bg-gray-50",
    className,
  );

export const TextArea: FC<TTextArea> = forwardRef<HTMLTextAreaElement, TTextArea>(
  (
    { className, color, containerClassName, disabled, errorMessage, fieldsetClassName, label, legendClassName, rows, ...props },
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
        <textarea className={TextAreaTWM({ className, disabled })} data-testid="textarea" disabled={disabled} ref={ref} rows={rows ?? 5} {...props} />
      </Label>

      {errorMessage && !disabled && <ErrorMessage errorMessage={errorMessage} />}
    </InputsContainer>
  ),
);

TextArea.displayName = "TextArea";
