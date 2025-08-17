"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { setActiveChannel, Channel } from "@store/slices/channelSlice";

export default function ChannelList() {
  const dispatch = useDispatch();
  const channels = useSelector((state: RootState) => state.channel.channels);
  const activeChannelId = useSelector(
    (state: RootState) => state.channel.activeChannelId,
  );

  return (
    <ul>
      {channels.map((channel: Channel) => (
        <li key={channel.id}>
          <Link
            href={`/channel/${channel.id}`}
            className={`block px-4 py-2 hover:bg-gray-200 ${
              activeChannelId === channel.id ? "bg-gray-300 font-bold" : ""
            }`}
            onClick={() => dispatch(setActiveChannel(channel.id))}
          >
            #{channel.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
