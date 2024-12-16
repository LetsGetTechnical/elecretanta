/* eslint-disable @next/next/no-img-element */
"use client";

import { GiftExchange } from "@/app/types/giftExchange";
import Avatar from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/Card/card";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, Settings, Share2, UsersRound } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const members = [
	{
		name: "Sofia Davis",
		email: "sofia@example.com",
	},
	{
		name: "Jackson Lee",
		email: "jackson@example.com",
	},
	{
		name: "Isabella Nguyen",
		email: "isabella@example.com",
	},
	{
		name: "William Brown",
		email: "william@example.com",
	},
	{
		name: "Isabella Nguyen",
		email: "isabella@example.com",
	},
];

export default function GiftExchangePage() {
	const { id } = useParams();
	const [giftExchangeData, setGiftExchangeData] = useState<GiftExchange>({
		id: "",
		name: "",
		description: "",
		budget: 0,
		drawing_date: "",
		group_image: "",
		exchange_date: "",
		owner_id: "",
	});

	useEffect(() => {
		const fetchGiftExchange = async () => {
			const giftExchangeResponse = await fetch(`/api/gift-exchanges/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const giftExchangeResult = await giftExchangeResponse.json();
			setGiftExchangeData(giftExchangeResult);
		};

		fetchGiftExchange();
	}, [id]);

	return (
		<main className="h-screen">
			<section className="max-w-5xl mx-auto flex flex-col gap-4 px-4 md:px-16 lg:px-32 xl:px-52 pt-12 text-primary-foreground">
				<div className="flex justify-between">
					<Link href={"/dashboard"} className="flex items-center gap-1 text-sm">
						<ChevronLeft size={16} strokeWidth={2.25} />
						<span>Back to Dashboard</span>
					</Link>
					<Link href={"#"} className="flex items-center gap-1 text-sm">
						<Settings size={16} strokeWidth={2.25} />
						<span>Settings</span>
					</Link>
				</div>
				<div className="flex flex-col items-center grow-0 gap-4 sm:flex-row">
					<div className="w-36 h-36 grow-0 shrink-0">
						<img
							className="w-full h-full rounded-xl ring-4 ring-white"
							src="https://img.freepik.com/free-vector/santa-claus-elements-red-background_1057-2152.jpg"
							alt="Group logo"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<div>
							<h1 className="text-lg font-semibold">{giftExchangeData.name}</h1>
							<p className="text-xs">{giftExchangeData.description}</p>
						</div>
						<Button size={"sm"} variant={"secondary"}>
							<Share2 />
							Share Link
						</Button>
						<div className="grid gap-4 grid-cols-3">
							<div>
								<div className="text-md font-semibold">Gift Budget</div>
								<div className="">${giftExchangeData.budget}</div>
							</div>
							<div>
								<div className="text-md font-semibold">Draw date</div>
								<div className="">
									{formatDate(giftExchangeData.drawing_date)}
								</div>
							</div>
							<div>
								<div className="text-md font-semibold">Exchange Date</div>
								<div className="">
									{formatDate(giftExchangeData.exchange_date)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Card className="w-full max-w-md mx-auto">
				<CardHeader className="bg-gray-100 rounded-xl">
					<CardTitle className="text-lg font-medium px-2 py-1 flex gap-2 items-start">
						<UsersRound />
						Members (5)
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-6">
					<div className="space-y-4">
						{members.map((member, i) => (
							<div key={i} className="flex items-center gap-4">
								<Avatar userAvatar="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" />
								<div className="flex flex-col">
									<span className="text-sm font-medium leading-none">
										{member.name}
									</span>
									<span className="text-sm text-muted-foreground">
										{member.email}
									</span>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
