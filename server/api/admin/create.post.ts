import { getFirestore } from "firebase-admin/firestore";

export default defineEventHandler(async (event) => {
	const { id, username } = await readBody<{
		id: string;
		username: string;
	}>(event);

	const db = getFirestore();

	const decodedToken = await event.context.decodedToken;

	if (!decodedToken) {
		throw createError({
			statusCode: 401,
			message: "Forbidden",
		});
	}

	const adminData = {
		name: username,
		id: id,
	};

	const res = await db.collection("admin").doc(username).set(adminData);

	if (res) {
		setResponseStatus(event, 201, "Created");
		return "Admin created";
	}
});
