import { getDownloadURL, ref, uploadBytes, type StorageError } from "firebase/storage";
import { storage } from "~/firebase";

type StorageActionResult =
	| {
			type: "success";
			result: string;
	  }
	| {
			type: "error";
			error: StorageError;
	  };

export default function () {
	async function useFileUpload(file: File, filename: string, path: string): Promise<StorageActionResult> {
		const filePath = `${path}/${filename}`;
		const fileRef = ref(storage, filePath);

		try {
			const uploadedFile = await uploadBytes(fileRef, file);

			const downloadURL = await getDownloadURL(uploadedFile.ref);

			return { type: "success", result: downloadURL };
		} catch (err) {
			const error = err as StorageError;
			return { type: "error", error };
		}
	}

	return { useFileUpload };
}
