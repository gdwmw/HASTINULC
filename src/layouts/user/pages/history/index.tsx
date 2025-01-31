import { FC, ReactElement } from "react";

import { Main } from "./modules";

interface I {
  slug: Promise<{ slug: string[] }>;
}

const HistoryLayout: FC<I> = (props): ReactElement => <Main slug={props.slug} />;

export default HistoryLayout;
