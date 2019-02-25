const initialState = {
  signUpFlag: false
};

export const signUpReducer = (state = initialState, action) => {
  console.log("Action recieved: " + action);

  if (action.type === "signup" && action.payload === 200) {
    return {
      ...state,
      signUpFlag: true
    };
  }

  if (action.type === "signup" && action.payload === 400) {
    return {
      ...state,
      signUpFlag: false
    };
  }

  return state;
};
