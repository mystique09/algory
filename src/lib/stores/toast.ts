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

function newToast() {
    const { set, update, subscribe }: Writable<Toast[]> = writable([]);

    function addToast(type: ToastType, message: string | undefined) {
        return update((toasts) => [...toasts, { type, message }]);
    }

    return { set, update, subscribe, addToast };
}

export const toast = newToast();