export default function({ dispatch }) {
  return next => action => {
    // If action does not payload
    // or, the payload does not have a .then property
    // we don't care about it, send it on
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // make sure the action's promise resolves
    action.payload.then(function(response) {
      // Create a new action with the old type, but
      // replace the promise with the response data
      const newAction = { ...action, payload: response };

      // Run entire cycle over again using dispatch
      dispatch(newAction);
    });
  };
}
