

const initialState = {
    user: [],
    isLoading: false,
    isError: false,
};
export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case "INSERT_PENDING":
            return { ...state, isLoading: true, isError: false };
        case "INSERT_FULFILLED":
                return {
                  ...state,
                  isLoading: false,
                  order: action.payload.data.data,
                  isError: false,
                };
        case "INSERT_REJECTED":
            return { ...state, isLoading: false, isError: true };
        case "DELETE_PRODUCT_PENDING":
            return { ...state, isLoading: true, isError: false };
        case "DELETE_PRODUCT_FULFILLED":
                return {
                  ...state,
                  isLoading: false,
                  order: action.payload.data.data,
                  isError: false,
                };
        case "DELETE_PRODUCT_REJECTED":
            return { ...state, isLoading: false, isError: true };
        case "UPDATE_PRODUCT_PENDING":
            return { ...state, isLoading: true, isError: false };
        case "UPDATE_PRODUCT_FULFILLED":
                return {
                  ...state,
                  isLoading: false,
                  order: action.payload.data.data,
                  isError: false,
                };
        case "UPDATE_PRODUCT_REJECTED":
            return { ...state, isLoading: false, isError: true };
        case "UPDATE_IMAGE_PRODUCT_PENDING":
                return { ...state, isLoading: true, isError: false };
        case "UPDATE_IMAGE_PRODUCT_FULFILLED":
                    return {
                      ...state,
                      isLoading: false,
                      order: action.payload.data.data,
                      isError: false,
                    };
        case "UPDATE_IMAGE_PRODUCT_REJECTED":
                return { ...state, isLoading: false, isError: true };
        case "GET_DATA_PENDING":
                    return { ...state, isLoading: true }
        case "GET_DATA_FULFILLED":
                    return { ...state, isLoading: false, product: action.payload.data.data, isError: false }
        case "GET_DATA_REJECTED":
                    return { ...state, isLoading: false, isError: true }
        case "GET_DATA_BY_ID_PENDING":
                    return { ...state, isLoading: true }
        case "GET_DATA_BY_ID_FULFILLED":
                    return { ...state, isLoading: false, product: action.payload.data.data, isError: false }
        case "GET_DATA_BY_ID_REJECTED":
                    return { ...state, isLoading: false, isError: true }
        case "GET_DATA_SEARCH_PENDING":
                    return { ...state, isLoading: true }
        case "GET_DATA_SEARCH_FULFILLED":
                    return { ...state, isLoading: false, product: action.payload.data.data.rows, isError: false }
        case "GET_DATA_SEARCH_REJECTED":
                    return { ...state, isLoading: false, isError: true }
        default:
            return state;
        
    }
}