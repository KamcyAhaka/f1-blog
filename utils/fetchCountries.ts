import type Country from "~/types/Country";

export default async function (): Promise<Country[]> {
	try {
		const { data, error } = await $fetch<{
			error: boolean;
			msg: string;
			data: Country[];
		}>("https://countriesnow.space/api/v0.1/countries/codes");

		// Handle API error
		if (error) {
			console.error("API error:", error);
			return []; // Return an empty array instead of throwing
		}

		// Return data if available, otherwise return an empty array
		return data ?? [];
	} catch (err) {
		// Log the error for debugging purposes
		console.error("Unexpected error:", err);
		return []; // Return an empty array as a fallback
	}
}
