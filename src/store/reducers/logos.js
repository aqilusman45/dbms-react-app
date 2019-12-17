import { LogoActions } from "../actions/logos";

const INITIAL_STATE = {
    logo: {},
}

export const LogoReducers = (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case LogoActions.ADD_LOGO:
            return  Object.assign({}, state , {logo : {
                image: `${action.payload.fileName}`,
                title: `${action.payload.fileName}`,
                url: `${action.payload.url}`
            }})
        case LogoActions.CLEAR_LOGO:
            return Object.assign({}, state , {logo : {}})
        default:
            return state
    }
}