import ChannelList from "../ChannelList";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 border-r text-black">
      <div className="p-4 font-bold text-lg">Channels</div>
      <ChannelList />
    </aside>
  );
}
