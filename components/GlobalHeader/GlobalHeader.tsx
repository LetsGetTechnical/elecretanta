"use client";

import { useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";
import NavLogo from "../NavLogo/NavLogo";
import SnowOverlayToggle from "../SnowOverlayToggle/SnowOverlayToggle";
import getUserAvatar from "@/lib/getUserAvatar";

const GlobalHeader = () => {
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    const fetchAvatar = async () => {
      const response = await getUserAvatar();
      setAvatar(response);
    };
    fetchAvatar();
  }, []);

  return (
    <nav className="flex items-center justify-between px-4 md:px-16 lg:px-32 xl:px-52 bg-elfHeaderGreen h-20">
      <NavLogo />
      <div className="flex gap-2 items-center">
        <SnowOverlayToggle />
        <Avatar userAvatar={avatar} />
      </div>
    </nav>
  );
};

export default GlobalHeader;
