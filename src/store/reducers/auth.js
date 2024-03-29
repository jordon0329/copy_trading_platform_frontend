// action - state management
import { REGISTER, LOGIN, LOGOUT } from './actions';

// initial state
export const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    }
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        isInitialized: true,
        user,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;
