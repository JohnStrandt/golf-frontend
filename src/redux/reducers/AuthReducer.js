const initState = {
  auth: {
    access: "",
    refresh: ""
  }
};

export const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        auth: action.payload,
        loading: false,
        error: null
      };
    case "AUTH_ERROR":
      return {
        ...state,
        error: action.payload.error
      };
    case "CLEAR_STATE":
      return initState;
    default:
      return state;
  }
};
