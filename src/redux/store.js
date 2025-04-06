import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slices/countSlice';




const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const  middlewares = getDefaultMiddleware()

    if (process.env.NODE_ENV === 'development') {
      const { logger } = require('redux-logger');
      middlewares.push(logger);
    }
    return middlewares;
  },
});

export default store;
