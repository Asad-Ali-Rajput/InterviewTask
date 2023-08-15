// import { createStore } from 'redux';
// import rootReducer from './reducer';

// const store = createStore(rootReducer);

// export default store;
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import localStorageMiddleware from './middleware'; // Import the middleware

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, localStorageMiddleware) // Apply the middleware
);

export default store;
