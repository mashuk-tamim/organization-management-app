"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
	// Clear the access token cookie
	cookies().set("access_token", "", {
		path: "/",
		expires: new Date(0), // Set an expiration date in the past to clear the cookie
	});
	return { success: true };
}
