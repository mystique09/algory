import { writable, type Writable } from 'svelte/store';

export enum ToastType {
    NOTHING,
    ERROR,
    WARNING,
    SUCCESS,
    INFO,
}

export type Toast = {
    id: string;
    type: ToastType;
    message: string;
    timeout: number;
}

const TIMEOUT = 3000;

function newToast() {
    const { set, update, subscribe }: Writable<Toast[]> = writable([]);

    function addToast(message: string, type: ToastType = ToastType.INFO, timeout: number) {
        update(state => {
            return [...state, { id: randomId(), type, message, timeout }];
        });
        setTimeout(removeToast, timeout)
    }

    function removeToast() {
        update(state => {
            return [...state.slice(0, state.length - 1)]
        });
    }

    return {
        set,
        subscribe,
        update,
        addToast,
        warning: (message: string, timeout: number = TIMEOUT) => addToast(message, ToastType.WARNING, timeout),
        error: (message: string, timeout: number = TIMEOUT) => addToast(message, ToastType.ERROR, timeout),
        success: (message: string, timeout: number = TIMEOUT) => addToast(message, ToastType.SUCCESS, timeout),
        info: (message: string, timeout: number = TIMEOUT) => addToast(message, ToastType.INFO, timeout),
    }
}

function randomId() {
    return '_' + Math.random().toString(36).substring(2, 6);
};

export const toast = newToast();