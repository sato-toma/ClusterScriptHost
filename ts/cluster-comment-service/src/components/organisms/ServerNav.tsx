const ServerNav = () => {
  return (
    <nav className="w-20 bg-gray-900 flex flex-col items-center py-4 space-y-4 overflow-y-auto">
      <button
        className="w-12 h-12 bg-blue-500 rounded-full hover:bg-blue-700"
        title="Server 1"
      />
      <button
        className="w-12 h-12 bg-green-500 rounded-full hover:bg-green-700"
        title="Server 2"
      />
      <button
        className="w-12 h-12 bg-red-500 rounded-full hover:bg-red-700"
        title="Server 3"
      />
    </nav>
  );
};

export default ServerNav;
