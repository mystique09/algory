import { ADMIN_PASSWORD, ADMIN_USERNAME, BACKEND_URL } from '$env/static/private';
import PocketBase from 'pocketbase';

export const pbClient = new PocketBase(BACKEND_URL || "http://localhost:8090");

export const authAdmin = async () => {
    await pbClient.admins.authViaEmail(ADMIN_USERNAME, ADMIN_PASSWORD);
}