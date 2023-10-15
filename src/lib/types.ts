import type { MutableRefObject } from "react";

import type { ClientRect, UniqueIdentifier } from "../types";

type AnyData = Record<string, any>;

export type Data<T = AnyData> = T & AnyData;

export type DataRef<T = AnyData> = MutableRefObject<Data<T> | undefined>;

export interface DroppableContainer {
  id: UniqueIdentifier;
  key: UniqueIdentifier;
  data: DataRef;
  disabled: boolean;
  node: MutableRefObject<HTMLElement | null>;
  rect: MutableRefObject<ClientRect | null>;
}
