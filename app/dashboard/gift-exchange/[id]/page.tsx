import { Button } from "@/components/Button/button";
import { ChevronLeft, Settings, Share } from "lucide-react";
import Link from "next/link";

export default function giftExchange() {
	return (
		<main className="h-screen">
			<section className="max-w-5xl mx-autof flex flex-col gap-4 px-4 md:px-16 lg:px-32 xl:px-52 pt-12">
				<div className="flex justify-between">
					<Link
						href={"/dashboard"}
						className="flex items-center gap-1 text-white text-sm"
					>
						<ChevronLeft size={16} strokeWidth={2.25} />
						<span>Back to Dashboard</span>
					</Link>
					<Link
						href={"#"}
						className="flex items-center gap-1 text-white text-sm"
					>
						<Settings size={16} strokeWidth={2.25} />
						<span>Settings</span>
					</Link>
				</div>
				<div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-4">
					<div className="row-span-2">
						<img
							className="h-16 w-16 lg:h-20 lg:w-20 rounded-xl ring-4 ring-white"
							src="https://img.freepik.com/free-vector/santa-claus-elements-red-background_1057-2152.jpg"
							alt="Group logo"
						/>
					</div>
					<div className="col-start-2 flex justify-between">
						<div>
							<h1>Office Secret Santa 2024</h1>
							<p>Annual office gift exchange! Let&apos;s spread some joy 🎄</p>
						</div>
						<Button size={"sm"}>
							<Share />
							Share Link
						</Button>
					</div>
					<div className="col-start-2">bottom right</div>
				</div>
			</section>
		</main>
	);
}
