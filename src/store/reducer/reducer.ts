import authReducer from "../slices/authSlice";
import toastReducer from "../slices/toastSlice";
import errorReducer from "../slices/errorSlice";
import modalReducer from "../slices/modalSlice";
import formReducer from "../slices/formSlice";

const reducer = {
  auth: authReducer,
  toast: toastReducer,
  error: errorReducer,
  modal: modalReducer,
  form: formReducer,
};

export default reducer;
