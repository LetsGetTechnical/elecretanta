import Avatar from "../Avatar/Avatar";

const GlobalHeader = () => {
  return (
    <nav className="flex items-center justify-between px-52 border-2 border-black h-20">
      <div className="border-2 border-blue-500"></div>
      <Avatar userAvatar="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" />
    </nav>
  );
};

export default GlobalHeader;
