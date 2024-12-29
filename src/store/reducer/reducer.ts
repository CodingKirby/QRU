import { errorReducer } from "../slices/errorSlice";
import formReducer from "../slices/formSlice";

const reducer = {
  error: errorReducer,
  form: formReducer,
};

export default reducer;
