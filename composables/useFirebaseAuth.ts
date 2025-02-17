import {
	createUserWithEmailAndPassword,
	type AuthError,
	signInWithEmailAndPassword,
	signOut,
	type User,
	updateProfile,
	applyActionCode,
	sendPasswordResetEmail,
	reload,
} from "firebase/auth";
import getRandomHexColor from "~/utils/getRandomColours";

type AuthReturnType = { type: "success"; user: User | null } | { type: "error"; error: AuthError };

type VerificationReturnType = { type: "success"; result: true } | { type: "error"; error: AuthError };

type PasswordRetrievalReturnType = { type: "success"; result: true } | { type: "error"; error: AuthError };

type TokenReturnType =
	| { type: "success"; token: string }
	| { type: "redirect"; url: string }
	| { type: "error"; error: AuthError };

export default function () {
	const admin = useState<User | null>("admin", () => null);
	const adminCookie = useCookie<User | null>("admin-user");

	// Restore state from cookie
	if (import.meta.client && adminCookie.value) {
		admin.value = adminCookie.value;
	}

	const { $auth } = useNuxtApp();

	async function saveAdminState(user: User | null) {
		admin.value = user; // Reactive state for components
		if (import.meta.client) {
			adminCookie.value = user ? user : null; // Persist state
		}
	}

	return {
		async useSignUp(email: string, password: string, username: string): Promise<AuthReturnType> {
			try {
				const credentials = await createUserWithEmailAndPassword($auth, email, password);

				const photoURL = `https://api.dicebear.com/7.x/initials/svg?seed=${username}&backgroundColor=${getRandomHexColor()}`;

				await updateProfile(credentials.user, {
					displayName: username,
					photoURL,
				});

				await saveAdminState(credentials.user);
				return { type: "success", user: credentials.user };
			} catch (error) {
				const authError = error as AuthError;
				return { type: "error", error: authError };
			}
		},
		async useSignIn(email: string, password: string): Promise<AuthReturnType> {
			try {
				const credentials = await signInWithEmailAndPassword($auth, email, password);

				await saveAdminState(credentials.user);
				return { type: "success", user: credentials.user };
			} catch (error) {
				const authError = error as AuthError;
				return { type: "error", error: authError };
			}
		},
		async useSignOut(): Promise<AuthReturnType> {
			try {
				await signOut($auth);
				await saveAdminState(null);
				return { type: "success", user: null };
			} catch (error) {
				const authError = error as AuthError;
				return { type: "error", error: authError };
			}
		},

		async useOobVerification(oobCode: string): Promise<VerificationReturnType> {
			try {
				await applyActionCode($auth, oobCode);
				await reload($auth.currentUser!);
				await saveAdminState($auth.currentUser);
				return { type: "success", result: true };
			} catch (error) {
				const authError = error as AuthError;
				return { type: "error", error: authError };
			}
		},

		async useTokenRetrieval(): Promise<TokenReturnType> {
			try {
				if (!$auth.currentUser) {
					return { type: "redirect", url: "/auth/signin" };
				}
				const token = await $auth.currentUser.getIdToken();

				if (token) return { type: "success", token };
				else {
					const error = new Error("Token not found") as AuthError;
					return { type: "error", error };
				}
			} catch (error) {
				const authError = error as AuthError;
				return { type: "error", error: authError };
			}
		},

		async useProfileUpdate(
			user: User,
			data: {
				username: string;
				photoURL: string;
			},
		) {
			try {
				await updateProfile(user, {
					displayName: data.username,
					photoURL: data.photoURL,
				});

				return { type: "success", result: true };
			} catch (err) {
				const error = err as AuthError;
				return { type: "error", error };
			}
		},

		async useSendPasswordReset(email: string): Promise<PasswordRetrievalReturnType> {
			try {
				await sendPasswordResetEmail($auth, email);
				return { type: "success", result: true };
			} catch (err) {
				const error = err as AuthError;
				return { type: "error", error };
			}
		},
	};
}
