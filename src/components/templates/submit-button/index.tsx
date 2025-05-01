import Image from "next/image";
import { FC, ReactElement } from "react";

import loadingAnimation from "@/public/assets/animations/Loading-W.svg";
import { ExampleA, IExampleA } from "@/src/components";

export const SubmitButton: FC<{ isReview?: boolean; label: string } & IExampleA> = ({ disabled, isReview, label, ...props }): ReactElement => (
  <ExampleA disabled={disabled} type="submit" {...props}>
    {disabled ? isReview ? label : <Image alt="Loading..." src={loadingAnimation} width={20} /> : label}
  </ExampleA>
);
