export const initialAuthState = {
  isAuthenticated: false,
  isLoading: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'INITIALISED':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'LOADING_END':
      return {
        ...state,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};
