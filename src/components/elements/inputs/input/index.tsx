import { DetailedHTMLProps, FC, forwardRef, InputHTMLAttributes, ReactElement, ReactNode } from "react";

import { twm } from "@/src/libs";

import { ErrorMessage, ILabel, InputsContainer, Label } from "../";
import { ExampleA } from "../..";

interface I
  extends DetailedHTMLProps<Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "color">, HTMLInputElement>,
    Omit<ILabel, "children" | "className"> {
  className?: {
    container?: string;
    input?: string;
  } & ILabel["className"];
  icon?: ReactNode;
  iconOnClick?: () => void;
}

const InputTWM = ({ className, disabled }: Omit<I, "color" | "label">) =>
  twm("w-full rounded-sm bg-transparent px-1 outline-none disabled:cursor-not-allowed", disabled && "text-gray-400", className?.input);

export const Input: FC<I> = forwardRef<HTMLInputElement, I>(
  ({ className, color, disabled, errorMessage, icon, iconOnClick, label, ...props }, ref): ReactElement => (
    <InputsContainer className={className?.container}>
      <Label
        className={{ fieldset: className?.fieldset, legend: className?.legend }}
        color={color}
        disabled={disabled}
        errorMessage={errorMessage}
        label={label}
      >
        <input className={InputTWM({ className, disabled })} data-testid="input" disabled={disabled} ref={ref} {...props} />

        {icon && (
          <ExampleA
            className={`ml-2 mr-1 ${!disabled && "text-inherit"} ${errorMessage ? "hover:text-red-600 active:text-red-700" : ""}`}
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
