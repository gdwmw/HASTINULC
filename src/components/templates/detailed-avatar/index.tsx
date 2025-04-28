import { FC, ReactElement } from "react";

import { Avatar, IAvatar } from "../avatar";

interface I extends Pick<IAvatar, "src"> {
  email: string;
  name: string;
  status: string;
}

export const DetailedAvatar: FC<I> = (props): ReactElement =>
  props.status === "authenticated" ? (
    <figure className="flex items-center gap-2">
      <Avatar size="sm" src={props.src} />
      <figcaption>
        <div className="-mb-1.5 mt-[-5px] line-clamp-1">
          <span className="text-lg">{props.name}</span>
        </div>
        <span className="block text-xs text-rose-500">{props.email}</span>
      </figcaption>
    </figure>
  ) : (
    <figure className="flex items-center gap-2">
      <Avatar size="sm" src="" />
      <figcaption>
        <span className="-mb-1.5 mt-[-5px] block text-lg">Guest</span>
        <span className="block text-xs text-gray-400">Not logged in</span>
      </figcaption>
    </figure>
  );
