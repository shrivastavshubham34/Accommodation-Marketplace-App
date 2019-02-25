const initialState = {
  data: false
};

export const profileReducer = (state = initialState, action) => {
  console.log(action);

  if (action.type === "LOADPROFILE") {
    //return {email : state.email + action.payload}

    if (action.StatusCode === 200)
      return {
        ...state,
        data: action.payload
      };

    if (action.StatusCode === 400)
      return {
        ...state
      };
  }
  return state;
};
