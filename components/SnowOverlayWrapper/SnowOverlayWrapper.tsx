"use client";

import { useSnowOverlay } from "@/providers/SnowOverlayProvider";
import { SnowOverlay } from "react-snow-overlay";

export default function SnowOverlayWrapper() {
	const { isSnowing } = useSnowOverlay();
	return <SnowOverlay disabledOnSingleCpuDevices disabled={!isSnowing} />;
}
