import { FC, ReactElement } from "react";

import { ASide, Footer, Main, Nav } from "./modules";

const HomeLayout: FC = (): ReactElement => (
  <>
    <Nav />
    <ASide />
    <Main />
    <Footer />
  </>
);

export default HomeLayout;
