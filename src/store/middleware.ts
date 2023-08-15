const localStorageMiddleware = store => next => action => {
    const result = next(action); // Call the next middleware/reducer
  
    const state = store.getState();
    localStorage.setItem('reduxState', JSON.stringify(state.items)); // Update localStorage
  
    return result;
  };

export default localStorageMiddleware;