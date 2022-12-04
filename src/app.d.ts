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

type AgendaProp = {
    titleTop: string;
    descriptionTop: string;
    titleBottom: string;
    descriptionBottom: string;
};

type UserInfoProp = {
    userId: string;
    infoId: string;
    isAuthenticated: boolean;
};

type UserDataProp = {
    followId: string;
    name: string;
    bio: string;
    followers: number;
    following: number;
    isFollowing: boolean;
    social: string;
};

type Answer = {
    author: string;
    content: string;
};

interface ImportMetaEnv {
    VITE_BACKEND_URL: string;
}
