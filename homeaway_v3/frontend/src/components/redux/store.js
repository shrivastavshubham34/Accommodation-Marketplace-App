import { LoginFormReducer } from "./reducer";
import { propertyReducer } from "./reducer/propertyReducer";
import { signUpReducer } from "./reducer/signupReducer";

import { profileReducer } from "./reducer/profileReducer";
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  form: formReducer,
  login: LoginFormReducer,
  property: propertyReducer,
  signup: signUpReducer,
  profile: profileReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
