import PocketBase from 'pocketbase';

export const pbClient = new PocketBase(process.env.POCKETBASE_URL);