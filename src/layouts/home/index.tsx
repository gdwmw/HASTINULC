import { FC, ReactElement } from "react";

import { ASide, Footer, Header, Main, Nav } from "./modules";

const HomeLayout: FC = (): ReactElement => (
  <>
    <Header>
      <Nav />
    </Header>
    <ASide />
    <Main />
    <Footer />
  </>
);

export default HomeLayout;
