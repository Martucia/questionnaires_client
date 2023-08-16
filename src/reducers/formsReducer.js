const SET_FORMS = 'SET_FORMS';
const CREATE_FORM = 'CREATE_FORM';
const REMOVE_FORM = 'REMOVE_FORM';
const UPDATE_FORM = 'UPDATE_FORM';

const defaultState = null;

export default function formsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FORMS:
            return action.payload;
        case CREATE_FORM:
            if (state) {
                return [...state, action.payload]
            } else {
                return [action.payload]
            }
        case REMOVE_FORM:
            return state.filter(form => form._id !== action.payload);
        case UPDATE_FORM:
            if (state) {
                return state.map(form => form._id == action.payload._id ? action.payload : form);
            } 
        default:
            return state;
    }
}

export const setForms = (forms) => ({
    type: SET_FORMS,
    payload: forms,
});

export const addForm = (form) => ({
    type: CREATE_FORM,
    payload: form
})

export const removeForm = (id) => ({
    type: REMOVE_FORM,
    payload: id
})

export const updateForm = (form) => ({
    type: UPDATE_FORM,
    payload: form
})