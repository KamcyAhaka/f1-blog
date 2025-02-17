import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import * as serviceAccount from "~/f1-blog-service-account-key.json";

export default defineNitroPlugin((nitroApp) => {
	const app = initializeApp({
		credential: cert(serviceAccount as ServiceAccount),
		databaseURL: "https://f1-blog-8d4cc-default-rtdb.firebaseio.com",
		storageBucket: "f1-blog-8d4cc.appspot.com",
	});

	nitroApp.hooks.hook("request", (event) => {
		event.context.firebaseAdmin = { app };
	});
});
