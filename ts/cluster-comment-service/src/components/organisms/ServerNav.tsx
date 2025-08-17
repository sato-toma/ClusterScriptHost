"use client";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedServer } from "@store/slices/serverChannelSlice";
import { RootState } from "@store/index";
import { serverChannels } from "@repositories/serverRepository";
import { ServerChannel } from "@models/ServerChannel";

export default function ServerNav() {
  const dispatch = useDispatch();
  const selectedServerId = useSelector(
    (state: RootState) => state.server.selectedServerId,
  );

  return (
    <nav className="w-20 bg-gray-900 flex flex-col items-center py-4 space-y-4 overflow-y-auto">
      {serverChannels.map((serverChannel: ServerChannel) => (
        <button
          key={serverChannel.server.id}
          className={`w-12 h-12 rounded-full bg-blue-500 ${
            selectedServerId === serverChannel.server.id
              ? "ring-4 ring-yellow-400"
              : ""
          }`}
          title={serverChannel.server.name}
          onClick={() => dispatch(setSelectedServer(serverChannel.server.id))}
        />
      ))}
    </nav>
  );
}
