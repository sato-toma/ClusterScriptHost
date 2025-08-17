import { ServerCore } from "@models/TodoServer";
import { Channel } from "@models/TodoChannel";
export interface ServerChannel {
  server: ServerCore;
  channels: Channel[];
}
