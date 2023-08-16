const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"

const defaultState = {
    isAuth: null
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                isAuth: false
            }
        default:
            return state
    }
}


export const setUser = (user) => ({ type: SET_USER, payload: user })
export const logout = () => ({ type: LOGOUT })