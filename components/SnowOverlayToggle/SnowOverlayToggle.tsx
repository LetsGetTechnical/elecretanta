"use client";

import { Snowflake, Sun } from "lucide-react";
import { useSnowOverlay } from "@/providers/SnowOverlayProvider";

export default function SnowOverlayToggle() {
	const { isSnowing, toggleSnowSetting } = useSnowOverlay();
	return (
		<button
			className="text-white p-1 hover:bg-transparent hover:border-none hover:scale-125 transition-all ease-in-out w-auto h-auto"
			onClick={toggleSnowSetting}
		>
			{isSnowing ? (
				<Sun size={24} className="text-orange-300 text-xl" />
			) : (
				<Snowflake size={24} className="text-blue-300 text-xl" />
			)}
		</button>
	);
}
