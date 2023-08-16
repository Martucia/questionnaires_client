const SET_FORM = 'SET_FORM';

const defaultState = null;

export default function formReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FORM:
            return action.payload;
        default:
            return state;
    }
}

export const setForm = (form) => ({
    type: SET_FORM,
    payload: form,
});