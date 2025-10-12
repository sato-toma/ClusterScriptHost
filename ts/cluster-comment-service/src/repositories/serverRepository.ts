import { ServerChannel } from "@models/ServerChannel";
export const serverChannels: ServerChannel[] = [
  {
    server: { id: "server1", name: "Blue Server", ownerId: "user1" },
    channels: [
      {
        id: "general",
        name: "General",
        serverId: "server1",
        isPrivate: false,
        order: 1,
      },
      {
        id: "random",
        name: "Random",
        serverId: "server1",
        isPrivate: false,
        order: 2,
      },
      {
        id: "sample",
        name: "Sample",
        serverId: "server1",
        isPrivate: false,
        order: 3,
      },
    ],
  },
  {
    server: { id: "server2", name: "Green Server", ownerId: "user1" },
    channels: [
      {
        id: "daily",
        name: "Daily",
        serverId: "server2",
        isPrivate: false,
        order: 1,
      },
      {
        id: "work",
        name: "Work",
        serverId: "server2",
        isPrivate: false,
        order: 2,
      },
    ],
  },
  {
    server: { id: "server3", name: "Red Server", ownerId: "user1" },
    channels: [
      {
        id: "game",
        name: "Game",
        serverId: "server3",
        isPrivate: false,
        order: 1,
      },
    ],
  },
];
