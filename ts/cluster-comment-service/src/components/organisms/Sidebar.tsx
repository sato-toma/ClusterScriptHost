"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { setSelectedChannel } from "@store/slices/serverChannelSlice";
import { serverChannels } from "@repositories/serverRepository";
import { ServerChannel } from "@models/ServerChannel";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { selectedServerId, selectedChannelId } = useSelector(
    (state: RootState) => state.server,
  );
  const serverChannel = serverChannels.find(
    (s: ServerChannel) => s.server.id === selectedServerId,
  );

  if (!serverChannel) {
    return (
      <aside className="w-64 bg-gray-100 text-black p-4">
        Please select a server to view channels
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-gray-100 border-r text-black">
      <div className="p-4 font-bold text-lg">{serverChannel.server.name}</div>
      <ul>
        {serverChannel.channels.map((channel) => (
          <li key={channel.id}>
            <button
              className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${
                selectedChannelId === channel.id ? "bg-gray-300 font-bold" : ""
              }`}
              onClick={() => dispatch(setSelectedChannel(channel.id))}
            >
              #{channel.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
