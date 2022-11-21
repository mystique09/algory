import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
	// define: {
	//     'process.env': process.env,
	// },
	plugins: [sveltekit()],
};

export default config;
