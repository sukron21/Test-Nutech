const initialState = {
    user: [],
    isLoading: false,
    isError: false,
};
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN_PENDING":
        case "REGISTER_PENDING":
            return { ...state, isLoading: true, isError: false };
        case "LOGIN_REJECTED":
        case "REGISTER_REJECTED":
            return { ...state, isLoading: false, isError: true };
        case "LOGIN_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                user: action.payload.data.data,
            };

        default:
            return state;
    }
}