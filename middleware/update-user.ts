export default defineNuxtRouteMiddleware((_to, _from) => {
	const { $auth } = useNuxtApp();
	const user = $auth.currentUser;

	if (!user) return;

	if (user.displayName === null || user.displayName === "User") {
		return navigateTo("/admin/edit-profile");
	}
});
