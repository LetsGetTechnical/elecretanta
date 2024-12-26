import Avatar from "../Avatar/Avatar";
import NavLogo from "../NavLogo/NavLogo";
import SnowOverlayToggle from "../SnowOverlayToggle/SnowOverlayToggle";

const GlobalHeader = () => {
	return (
		<nav className="flex items-center justify-between px-4 md:px-16 lg:px-32 xl:px-52 bg-elfHeaderGreen h-20">
			<NavLogo />
			<div className="flex gap-2 items-center">
				<SnowOverlayToggle />
				<Avatar userAvatar="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" />
			</div>
		</nav>
	);
};

export default GlobalHeader;
