import { derived, writable, type Readable, type Writable } from 'svelte/store';

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

const TIMEOUT = 2000;

function newToast() {
    const _toast: Writable<Toast[]> = writable([]);

    function addToast(message: string, type: ToastType = ToastType.INFO, timeout: number) {
        _toast.update(state => {
            return [...state, { id: randomId(), type, message, timeout }];
        });
    }

    const notifications: Readable<Toast[]> = derived(_toast, ($_toast: Toast[], set) => {
        set($_toast);
        if ($_toast.length > 0) {
            const timer = setTimeout(() => {
                _toast.update(state => {
                    state.shift()
                    return state
                })
            }, $_toast[0].timeout)
            return () => {
                clearTimeout(timer)
            }
        }
    });

    const { subscribe } = notifications;

    return {
        subscribe,
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