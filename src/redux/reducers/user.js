import {
  LOGOUT_USER,
  RESET_LOGIN_DATA,
  USER_DATA,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../actions/user";

const initialState = {
  loading: false,
  user: null,
  error: false,
  submit: false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {loading: true};
    case USER_LOGIN_SUCCESS:
      return {loading: false, user: action.payload};
    case USER_DATA:
      return {...state, loading: false, userPayload: action.payload};
    case USER_LOGIN_FAIL:
      return {loading: false, error: action.payload};
    case RESET_LOGIN_DATA:
      return {loading: false};
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}

export default userReducer
