import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../features/courses/coursesSlice";
import authorsReducer from "../features/authors/authorsSlice";
import commentsReducer from "../features/comments/commentsSlice";
import requestsReducer from "../features/requests/requestsSlice";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/categories/categorySlice";

export default configureStore({
  reducer: {
    courses: coursesReducer,
    authors: authorsReducer,
    comments: commentsReducer,
    requests: requestsReducer,
    auth: authReducer,
    category: categoryReducer,
  },
});
