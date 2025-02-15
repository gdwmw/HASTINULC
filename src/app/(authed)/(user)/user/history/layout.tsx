import { FC, PropsWithChildren, ReactElement } from "react";

import { getAllSession } from "@/src/hooks/session";
import { GlobalHistoryLayout } from "@/src/layouts/user/pages/history/global";
import { GETBookings, GETReviews } from "@/src/utils/api";

type T = Readonly<PropsWithChildren>;

const Layout: FC<T> = async (props): Promise<ReactElement> => {
  const session = await getAllSession();
  const bookingsResponse = await GETBookings(`sort[0]=current:desc&filters[data][documentId][$eq]=${session?.user?.datasDocumentId}`);
  const reviewsResponse = await GETReviews(`filters[username][$eq]=${session?.user?.username}`);

  return (
    <GlobalHistoryLayout bookingsResponse={bookingsResponse} reviewsResponse={reviewsResponse} session={session}>
      {props.children}
    </GlobalHistoryLayout>
  );
};

export default Layout;
