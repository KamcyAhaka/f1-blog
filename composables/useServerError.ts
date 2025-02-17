import type { AuthError } from "firebase/auth";
import type { FirestoreError } from "firebase/firestore";

export default () => {
	const throwAuthError = (authError: AuthError) => {
		switch (authError.code) {
			case "auth/user-not-found":
				throw createError({
					statusMessage: "User does not exist.",
				});

			case "auth/wrong-password":
				throw createError({
					statusMessage: "Invalid email or password.",
				});

			case "auth/network-request-failed":
				throw createError({
					statusMessage: "Please check your internet connection and try again.",
				});

			case "auth/internal-error":
				throw createError({
					statusMessage: "Internal server error, please try again later.",
				});

			case "auth/email-already-in-use":
				throw createError({
					statusMessage: "This email is already in use.",
				});

			default:
				throw createError({
					statusMessage: authError.message,
				});
		}
	};

	const throwDbError = (dbError: FirestoreError) => {
		switch (dbError.code) {
			case "aborted":
				throw createError({
					statusMessage: "Action aborted.",
					message: dbError.code,
				});
			case "already-exists":
				throw createError({
					statusMessage: "Document already exists.",
					message: dbError.code,
				});
			case "cancelled":
				throw createError({
					statusMessage: "Action cancelled.",
					message: dbError.code,
				});
			case "data-loss":
				throw createError({
					statusMessage: "Data lost.",
					message: dbError.code,
				});
			case "permission-denied":
				throw createError({
					statusMessage: "You are not permitted to perform this action.",
					message: dbError.code,
				});
			case "internal":
				throw createError({
					statusMessage: "Internal systems down.",
					message: dbError.code,
				});
			case "unauthenticated":
				throw createError({
					statusMessage: "This action required authentication.",
					message: dbError.code,
				});
			case "unimplemented":
				throw createError({
					statusMessage: "Operation not implemented.",
					message: dbError.code,
				});
			case "failed-precondition":
				throw createError({
					statusMessage: "Conditions have not being met.",
					message: dbError.code,
				});

			default:
				throw createError({
					statusMessage: dbError.message,
					message: dbError.code,
				});
		}
	};

	return { throwAuthError, throwDbError };
};
