import { ServerId } from "./TodoServer";
export type SectionId = string;
export type ChannelId = string;

export interface Section {
  id: SectionId;
  serverId: ServerId;
  name: string;
  order: number;
}

export interface Channel {
  id: ChannelId;
  serverId: ServerId;
  sectionId?: SectionId | null;
  name: string;
  isPrivate: boolean;
  order: number;
}
