import Link from "next/link";

const channels = [
  { id: "work", title: "Work" },
  { id: "daily", title: "Daily" },
  { id: "private", title: "Private" },
];

export default function ChannelList() {
  return (
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>
          <Link
            href={`/channel/${channel.id}`}
            className="block px-4 py-2 hover:bg-gray-200"
          >
            #{channel.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
