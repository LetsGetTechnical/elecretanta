import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader/GlobalHeader";
import { SnowOverlayProvider } from "@/providers/SnowOverlayProvider";
import SnowOverlayWrapper from "@/components/SnowOverlayWrapper/SnowOverlayWrapper";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Elecretanta",
	description: "Secret Santa gift choosing app using AI.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient`}
			>
				<SnowOverlayProvider>
					<GlobalHeader />
					<SnowOverlayWrapper />
					{children}
				</SnowOverlayProvider>
			</body>
		</html>
	);
}
