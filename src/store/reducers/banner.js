import { BannerActions } from "../actions/banner";

const INITIAL_STATE = {
    banners: [],
}

export const BannerReducers = (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case BannerActions.ADD_BANNER:
            return  Object.assign({}, state , {banners : [...state.banners, {
                image: `${action.payload.fileName}`,
                title: `${action.payload.fileName}`,
                url: `${action.payload.url}`
            }]})
        case BannerActions.CLEAR_BANNER:
            return Object.assign({}, state , {banners : []})
        case BannerActions.REMOVE_BANNER:
            let banners = [...state.banners]
            banners.splice(action.payload.index, 1);
            return Object.assign({}, state , {banners : [...banners]})
        default:
            return state
    }
}