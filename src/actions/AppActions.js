import {
    LOCAL_STORAGE_GET_ITEM,
    LOCAL_STORAGE_SET_ITEM

} from '../constants/APP'


export function localStorageGetItem (name) {

    return {
        type: LOCAL_STORAGE_GET_ITEM,
        payload: {name}
    }
}

export function localStorageSetItem (name, data) {

    return {
        type: LOCAL_STORAGE_SET_ITEM,
        payload: {name, data}
    }
}
