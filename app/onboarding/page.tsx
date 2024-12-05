"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Gift } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const stepOneSchema = z.object({});

const stepTwoSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	giftCircle: z.string().min(1, {
		message: "Please enter your gift-giving circle.",
	}),
});

// Combined schema for the entire form
export const FormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	giftCircle: z.string().min(1, {
		message: "Please enter your gift-giving circle.",
	}),
	colorTheme: z.string().min(1, {
		message: "Please select a color theme.",
	}),
});

type Step = {
	title: string;
	description: string;
	schema: z.AnyZodObject;
};

const steps: Step[] = [
	{
		title: "Welcome to Elecretanta✨",
		description: "Let's find your perfect gift match",
		schema: stepOneSchema,
	},
	{
		title: "About You",
		description: "First let's get to know each other",
		schema: stepTwoSchema,
	},
];

export default function OnboardingPage() {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<z.infer<typeof FormSchema>>({
		name: "",
		giftCircle: "",
		colorTheme: "",
	});

	// Initialize form
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(steps[currentStep].schema),
		defaultValues: {
			name: "",
			giftCircle: "",
			colorTheme: "",
		},
	});

	function next() {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	}

	function back() {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	}

	function onSubmit(data: z.infer<typeof FormSchema>) {
		// Update formData with the current step's data
		setFormData((prev) => ({
			...prev,
			...data,
		}));

		if (currentStep === steps.length - 1) {
			// Replace with API call to update profile in DB
			console.log("Form data:", formData);
		} else {
			next();
		}
	}

	return (
		<main className="w-full min-h-screen flex flex-col items-center justify-center">
			<div className="max-w-lg">
				<Progress value={(currentStep / steps.length) * 100} className="my-4" />
				<Card>
					<CardHeader>
						<CardTitle className="text-center text-2xl font-bold">
							{steps[currentStep].title}
						</CardTitle>
						<CardDescription className="text-center">
							{steps[currentStep].description}
						</CardDescription>
					</CardHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<CardContent>
								{/* Conditionally render the form Fields for each step */}
								{currentStep === 0 && (
									<>
										<div className="bg-pink-100 w-fit p-3 rounded-full mx-auto mb-4">
											<Gift className="text-red-600" />
										</div>
										<h3 className="font-bold text-center">Hello, John Doe!</h3>
										<p className="text-center">
											Our elf-powered AI is here to help you create your gift
											profile. In just a few minutes, we&apos;ll help your
											Secret Santa discover the perfect gift for you
										</p>
									</>
								)}
								{currentStep === 1 && (
									<>
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>How should we call you?</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormDescription>
														This is how you&apos;ll appear to your Secret Santa
														group
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="giftCircle"
											render={({ field }) => (
												<FormItem className="mt-4">
													<FormLabel>
														Which gift-giving circle do you belong to?
													</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</>
								)}
							</CardContent>
							<CardFooter>
								<div
									className={
										"flex w-full " +
										(currentStep === 0 ? "justify-end" : "justify-between")
									}
								>
									{currentStep !== 0 && (
										<Button type="button" variant="secondary" onClick={back}>
											<ChevronLeft />
											Back
										</Button>
									)}
									<Button type="submit">
										{currentStep < steps.length - 1 ? "Next" : "Submit"}
										<ChevronRight />
									</Button>
								</div>
							</CardFooter>
						</form>
					</Form>
				</Card>
			</div>
		</main>
	);
}
