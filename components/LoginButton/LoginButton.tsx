"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "../Button/button";
import { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export default function LoginButton({ redirectPath = "/onboarding" }) {
	const [isLoading, setIsLoading] = useState(false);

	const signInWithGoogle = async () => {
		setIsLoading(true);
		const supabase = createClient();
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
				queryParams: {
					redirect_to: redirectPath,
				},
			},
		});

		if (error) {
			console.error("Error:", error.message);
		}
	};

	return (
		<>
			<button
				onClick={signInWithGoogle}
				style={{
					backgroundColor: "white",
					color: "black",
					padding: "1rem",
					borderRadius: "0.5rem",
				}}
			>
				Sign in with Google
			</button>
			<Button
				variant="outline"
				className={"w-full"}
				disabled={isLoading}
				onClick={signInWithGoogle}
			>
				{!isLoading ? (
					<>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
								fill="currentColor"
							/>
						</svg>
					</>
				) : (
					<LoadingSpinner className="text-logoRed" />
				)}
				<span>Continue with Google</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-gift"
				>
					<rect x="3" y="8" width="18" height="4" rx="1" />
					<path d="M12 8v13" />
					<path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
					<path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
				</svg>
			</Button>
		</>
	);
}
