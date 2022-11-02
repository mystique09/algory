import { writable, type Writable } from 'svelte/store';

export enum ToastType {
    NOTHING,
    ERROR,
    WARNING,
    SUCCESS,
    INFO,
}

export type Toast = {
    type: ToastType;
    message: string | undefined | null;
}

export const toast: Writable<Toast> = writable({ type: ToastType.NOTHING, message: "" });