const SET_NOTIFICATION = 'SET_NOTIFICATION';
const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';

const defaultState = {
    isVisible: false,
    text: "",
    status: true
};

export default function notificationReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_NOTIFICATION:
            return {
                isVisible: true,
                text: action.payload.text,
                status: action.payload.status
            }
        case CLOSE_NOTIFICATION:
            return {
                isVisible: false,
                text: ""
            }
        default:
            return state;
    }
}

export const setNotification = (text, status) => ({
    type: SET_NOTIFICATION,
    payload: { text, status },
});

export const closeNotification = () => ({
    type: CLOSE_NOTIFICATION
})
