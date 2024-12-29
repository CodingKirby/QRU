import authReducer from "../slices/authSlice";
import errorReducer from "../slices/errorSlice";
import modalReducer from "../slices/modalSlice";
import formReducer from "../slices/formSlice";

const reducer = {
  auth: authReducer,
  error: errorReducer,
  modal: modalReducer,
  form: formReducer,
};

export default reducer;
