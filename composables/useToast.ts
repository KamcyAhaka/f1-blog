import type { Ref } from "vue";
import type Toast from "~/types/Toast";

const clearToast = (toast: Toast) => {
	toast.type = "success";
	toast.text = "";
};

export default () => {
	const useToastNotification = (
		toast: Toast,
		type: "success" | "warning" | "error",
		text: string,
		showToast: Ref<boolean>,
		navigationRoute?: string,
	) => {
		toast.text = text;
		toast.type = type;
		showToast.value = true;

		setTimeout(() => {
			showToast.value = false;
			clearToast(toast);

			if (navigationRoute) {
				navigateTo(navigationRoute);
			}
		}, 3000);
	};
	return { useToastNotification };
};
