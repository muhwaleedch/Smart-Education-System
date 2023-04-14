import axios from 'axios';

const loginUser = (data, router) => async dispatch => {
  dispatch({type: USER_LOGIN_REQUEST});

  try {
    const result = await axios.post(
      'http://localhost:8080/api/v1/user/login',
      JSON.stringify({
        "emailAddress": data.emailAddress,
        "password": data.password,
        "role": data.role
      }),
    );
    dispatch({type: USER_LOGIN_SUCCESS, payload: result.data.payload});
    const userData = await axios.post(
      'http://localhost:8080/api/v1/admin/details',
      result.data.payload.accessToken
    );
    dispatch({type: USER_DATA, payload: userData.data.payload});
    console.log('data.role', data.role);
    if (data.role === "ADMIN") {
      router.push("/admin");
    } else if (data.role === "TEACHER") {
      router.push("/teacher");
    } else if (data.role === "STUDENT") {
      router.push("/student");
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message || 'something went wrong',
    });
  }
};

const resetLoginData = () => async dispatch => {
  dispatch({type: RESET_LOGIN_DATA});
};

export {loginUser, resetLoginData};

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_DATA = 'USER_DATA';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const RESET_LOGIN_DATA = 'RESET_LOGIN_DATA';
export const LOGOUT_USER = 'LOGOUT_USER';
