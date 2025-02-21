import { FC, ReactElement } from "react";

import { ASide } from "./modules";

interface I {
  slug: Promise<{ slug: string[] }>;
}

const HistoryLayout: FC<I> = (props): ReactElement => <ASide slug={props.slug} />;

export default HistoryLayout;
