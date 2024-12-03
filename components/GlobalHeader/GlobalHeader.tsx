import Avatar from "../Avatar/Avatar";
import NavLogo from "../NavLogo/NavLogo";

const GlobalHeader = () => {
  return (
    <nav className="flex items-center justify-between px-52 bg-elfHeaderGreen h-20">
      <NavLogo />
      <Avatar userAvatar="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" />
    </nav>
  );
};

export default GlobalHeader;
