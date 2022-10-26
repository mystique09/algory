// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare namespace App {
    interface Locals {
        session: {
            token: string;
            user: {
                id: string;
                email: string;
                verified: boolean;
                profile: {
                    id: string;
                    avatar?: string;
                    name: string;
                    userId: string;
                }
            },
        },
    }
    // interface PageData {}
    // interface Error {}
    // interface Platform {}
}