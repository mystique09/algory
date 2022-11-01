import { BACKEND_URL } from "$env/static/private";
import type { Handle } from "@sveltejs/kit";
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase(BACKEND_URL || "http://localhost:8090");
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || "");

    if (event.locals.pb.authStore.isValid) {
        event.locals.session = event.locals.pb.authStore.model;
    } else {
        event.locals.session = null;
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);
    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: process.env.NODE_ENV === "production" }))
    return response;
}