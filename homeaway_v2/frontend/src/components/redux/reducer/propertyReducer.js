const initialState = {
  addPropCheck: false,
  data: false
};

export const propertyReducer = (state = initialState, action) => {
  console.log("Action recieved: " + action);

  if (action.type === "add_property" && action.payload === 200) {
    return {
      ...state,
      addPropCheck: true
    };
  }

  if (action.type === "add_property" && action.payload === 400) {
    return {
      ...state,
      addPropCheck: false
    };
  }

  if (action.type === "LOADPROPERTY") {
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
