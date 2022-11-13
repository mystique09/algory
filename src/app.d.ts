// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare namespace App {
	interface Locals {
		pb: import("pocketbase").default;
		session: import("pocketbase").BaseModel | import("pocketbase").Admin | null;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

interface ImportMetaEnv {
	VITE_BACKEND_URL: string;
}
