import type { User } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

type AdminProfileData = {
	username: string;
	mobileNumber: string;
	dialCode: string;
	nationality: string;
	gender: string;
};

export default function () {
	const { $db } = useNuxtApp();
	function useCreateAdmin(user: User, adminData: AdminProfileData) {
		const adminRef = doc($db, "admin", user.uid);
		setDoc(adminRef, {
			...adminData,
			createdAt: serverTimestamp(),
		});
	}

	return {
		useCreateAdmin,
	};
}
