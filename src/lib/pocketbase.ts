import PocketBase from 'pocketbase';

export const client = new PocketBase(process.env.POCKETBASE_URL);