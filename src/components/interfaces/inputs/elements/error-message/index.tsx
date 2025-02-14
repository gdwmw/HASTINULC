import { FC, ReactElement } from "react";

interface I {
  errorMessage: string;
}

export const ErrorMessage: FC<I> = (props): ReactElement => (
  <span className="ml-2 block text-sm font-medium text-red-500" data-testid="example-error-message">
    {props.errorMessage}
  </span>
);
