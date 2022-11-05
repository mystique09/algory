import { writable, type Writable } from "svelte/store"

export enum LoadingStatus {
    IDLE,
    LOADING,
    NAVIGATING
}

type Loader = {
    status: LoadingStatus;
    message: string;
}

export const newLoader = () => {
    const { set, update, subscribe }: Writable<Loader> = writable({
        status: LoadingStatus.IDLE,
        message: ""
    });

    function setNavigate(isNavigating: boolean) {
        update(() => {
            return {
                status: isNavigating ? LoadingStatus.NAVIGATING : LoadingStatus.IDLE,
                message: ""
            }
        });
    }

    return { set, update, subscribe, setNavigate };
}

export const loading = newLoader();