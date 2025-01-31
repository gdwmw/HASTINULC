import { FC, PropsWithChildren, ReactElement } from "react";

import { getAllSession } from "@/src/hooks/session";
import { UserLayout } from "@/src/layouts/user/layout";
import { GETBookings } from "@/src/utils/api";

type T = Readonly<PropsWithChildren>;

const Layout: FC<T> = async (props): Promise<ReactElement> => {
  const session = await getAllSession();
  const response = await GETBookings(`sort[0]=current:desc&filters[data][documentId][$eq]=${session?.user?.datasDocumentId}`);

  return (
    <UserLayout response={response} session={session}>
      {props.children}
    </UserLayout>
  );
};

export default Layout;
