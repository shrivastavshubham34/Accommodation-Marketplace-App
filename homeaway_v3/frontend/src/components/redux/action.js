export const ADD_PROP = "add_property";
export const LOGIN = "LOGIN";
export const SIGNUP = "signup";
export const PROFILE = "LOADPROFILE";
export const LOADPROPERTY = "LOADPROPERTY";

export function login(data, statusCode, history) {
  history.push("/home");

  return {
    type: LOGIN,
    payload: statusCode,
    usertype: data.usertype
  };
}

export function propadd(statusCode) {
  return {
    type: ADD_PROP,
    payload: statusCode
  };
}

export function signup(statusCode) {
  return {
    type: SIGNUP,
    payload: statusCode
  };
}

export function viewprofile(StatusCode, data) {
  return {
    type: PROFILE,
    payload: data,
    StatusCode: StatusCode
  };
}

export function viewproperty(StatusCode, data) {
  return {
    type: LOADPROPERTY,
    payload: data,
    StatusCode: StatusCode
  };
}
