import { FetchRequestType, FetchResponseType } from "./common";

export type notificationType = {
  id?: number;
  title: string;
  subtitle: string;
  type: string;
  url: string;
}

export type FetchNotificationRequestType = FetchRequestType<notificationType>;
