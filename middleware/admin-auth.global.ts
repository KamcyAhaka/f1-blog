import type { User } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, _from) => {
	const admin = useState<User | null>("admin");
	const adminCookie = useCookie<User | null>("admin-user");

	if (!admin.value && adminCookie.value) {
		admin.value = adminCookie.value; // Restore reactive state
	}

	// Allow unrestricted access to the /admin/action route
	if (to.path === "/admin/action") {
		console.warn("Accessing admin action route - bypassing auth check");
		return;
	}

	// Check for authentication on admin routes
	if (to.path.startsWith("/admin/")) {
		console.warn("Trying to access admin route");

		// Redirect if no user is authenticated
		if (admin.value === null) {
			console.log("No auth or current user");
			return navigateTo(`/auth/signin?redirect=${encodeURIComponent(to.path)}`);
		}
	}
});
