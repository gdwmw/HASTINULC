import { Metadata, Viewport } from "next";
import { FC, ReactElement } from "react";

import QuestionnaireLayout from "@/src/layouts/user/pages/questionnaire";

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "Questionnaire",
};

const QuestionnairePage: FC = (): ReactElement => <QuestionnaireLayout />;

export default QuestionnairePage;
