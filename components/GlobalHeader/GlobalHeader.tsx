import Avatar from "../Avatar/Avatar";

const GlobalHeader = () => {
  return (
    <nav className="flex items-center justify-between px-52 border-2 border-black h-20">
      <div className="border-2 border-blue-500"></div>
      <Avatar />
    </nav>
  );
};

export default GlobalHeader;
