import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const validateGroupExchangeDates = (
	drawingDate: Date,
	exchangeDate: Date
): string | null => {
	if (drawingDate >= exchangeDate) {
		return "Drawing date must be before exchange date";
	}
	return null;
};

export const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
