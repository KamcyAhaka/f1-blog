export default defineNuxtRouteMiddleware((_to, _from) => {
	const { $auth } = useNuxtApp();
	const user = $auth.currentUser;

	if (user && !user.emailVerified) {
		return navigateTo("/admin/verify-email");
	}
});
