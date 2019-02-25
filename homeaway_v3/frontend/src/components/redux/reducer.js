const initialState = {
  authFlag: false,
  usertype: ""
};

export const LoginFormReducer = (state = initialState, action) => {
  console.log(action);
  const OWNER = "owner";
  const TRAVELER = "traveler";

  if (action.type === "LOGIN" && action.payload === 200) {
    //return {email : state.email + action.payload}

    if (action.usertype === OWNER)
      return {
        ...state,
        authFlag: true,
        usertype: OWNER
      };
    if (action.usertype === "traveler")
      return {
        ...state,
        authFlag: true,
        usertype: TRAVELER
      };
  }
  if (action.type === "LOGIN" && action.payload === 400) {
    return {
      ...state,
      authFlag: false
    };
  }

  return state;
};

export default LoginFormReducer;
