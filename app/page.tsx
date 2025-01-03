import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/Card/card";
import LoginButton from "@/components/LoginButton/LoginButton";
import { Calendar, Gift, Sparkles, Users } from "lucide-react";

const features = [
	{
		icon: <Gift className="w-10 h-10 text-logoRed mb-2" />,
		title: "Smart Gifting",
		description: "AI-powered gift suggestions tailored to each recipient",
	},
	{
		icon: (
			<Users className="w-10 h-10 text-giftSuggestionTextLightGreen mb-2" />
		),
		title: "Easy Organizing",
		description: "Effortlessly manage groups and participants",
	},
	{
		icon: <Calendar className="w-10 h-10 text-mutedRed mb-2" />,
		title: "Scheduling",
		description: "Set draw dates and exchange dates with reminders",
	},
	{
		icon: <Sparkles className="w-10 h-10 text-primaryButtonYellow mb-2" />,
		title: "Personalization",
		description: "Customize your exchange details",
	},
];

export default function Home() {
	return (
		<div className="min-h-screen-minus-20">
			<main className="container mx-auto px-4 py-16">
				{/* Hero Section */}
				<section className="text-center mb-16">
					<h1 className="text-5xl font-bold text-primary-foreground">
						Make Gift-Giving Magical
					</h1>
					<p className="text-xl text-primary-foreground/70 mb-8">
						Elfgorithm takes the guesswork out of Secret Santa and gift
						exchanges.
					</p>
					<LoginButton />
				</section>

				{/* Features Section */}
				<section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
					{features.map((feature) => (
						<Card key={feature.title}>
							<CardHeader>
								<span className="text-red-400">{feature.icon}</span>
								<CardTitle>{feature.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>{feature.description}</CardDescription>
							</CardContent>
						</Card>
					))}
				</section>

				{/* How It Works Section */}
				<section className="mb-16">
					<h2 className="text-3xl font-bold text-primary-foreground text-center mb-8">
						How It Works
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								step: 1,
								title: "Create a Group",
								description:
									"Invite participants and set your exchange details.",
							},
							{
								step: 2,
								title: "AI Matches & Suggests",
								description:
									"Our algorithm pairs givers and suggests perfect gifts.",
							},
							{
								step: 3,
								title: "Enjoy the Exchange",
								description: "Exchange gifts and spread joy with your group!",
							},
						].map((step, index) => (
							<div key={index} className="text-center">
								<div className="w-16 h-16 bg-mutedRed text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
									{step.step}
								</div>
								<h3 className="text-xl font-semibold text-red-200 mb-2">
									{step.title}
								</h3>
								<p className="text-primary-foreground">{step.description}</p>
							</div>
						))}
					</div>
				</section>

				{/* CTA Section */}
				<section className="text-center mb-16">
					<h2 className="text-3xl font-bold text-primary-foreground mb-4">
						Ready to Spread Some Joy?
					</h2>
					<p className="text-xl text-primary-foreground/70 mb-8">
						Join Elfgorithm today and make your next gift exchange
						unforgettable.
					</p>
					<LoginButton />
				</section>
			</main>
		</div>
	);
}
