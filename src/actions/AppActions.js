import {
    LOCAL_STORAGE_SUBSCRIBE
} from '../constants/APP'

export function localStorageSubscribe (data) {

    return {
        type: LOCAL_STORAGE_SUBSCRIBE,
        payload: data
    }
}
