import type { UploadOptions } from "@google-cloud/storage";
import type { DecodedIdToken } from "firebase-admin/auth";

export default defineEventHandler(async (event) => {
	const data = await readBody(event);

	const decodedToken = (await event.context.decodedToken) as DecodedIdToken;

	if (!decodedToken) {
		throw createError({
			statusCode: 401,
			message: "Forbidden",
		});
	}

	const _filePath = "imgaes/admin/profile/";

	const destFileName = decodedToken.uid;

	console.log("Data", data);

	async function uploadFile() {
		const _options: UploadOptions = {
			destination: destFileName,

			// Optional:
			// Set a generation-match precondition to avoid potential race conditions
			// and data corruptions. The request to upload is aborted if the object's
			// generation number does not match your precondition. For a destination
			// object that does not yet exist, set the ifGenerationMatch precondition to 0
			// If the destination object already exists in your bucket, set instead a
			// generation-match precondition using its generation number.
		};

		// await storage.bucket('F1 Blog').
	}

	try {
		await uploadFile();
	} catch (error) {
		console.error(error);
	}
});
