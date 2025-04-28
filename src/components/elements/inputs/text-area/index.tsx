import { DetailedHTMLProps, FC, forwardRef, ReactElement, TextareaHTMLAttributes } from "react";

import { twm } from "@/src/libs";

import { ErrorMessage, ILabel, InputsContainer, Label } from "../";

interface I
  extends DetailedHTMLProps<Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "color">, HTMLTextAreaElement>,
    Omit<ILabel, "children" | "className"> {
  className?: {
    container?: string;
    textarea?: string;
  } & ILabel["className"];
  rows?: number;
}

const TextAreaTWM = ({ className, disabled }: Omit<I, "color" | "label">) =>
  twm(
    "max-h-[200px] min-h-[120px] w-full rounded-sm bg-transparent px-1 outline-none disabled:cursor-not-allowed",
    disabled && "text-gray-400",
    className?.textarea,
  );

export const TextArea: FC<I> = forwardRef<HTMLTextAreaElement, I>(
  ({ className, color, disabled, errorMessage, label, rows, ...props }, ref): ReactElement => (
    <InputsContainer className={className?.container}>
      <Label
        className={{ fieldset: className?.fieldset, legend: className?.legend }}
        color={color}
        disabled={disabled}
        errorMessage={errorMessage}
        label={label}
      >
        <textarea className={TextAreaTWM({ className, disabled })} data-testid="textarea" disabled={disabled} ref={ref} rows={rows ?? 5} {...props} />
      </Label>

      {errorMessage && !disabled && <ErrorMessage errorMessage={errorMessage} />}
    </InputsContainer>
  ),
);

TextArea.displayName = "TextArea";
