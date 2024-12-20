import get from "lodash/get";
import noop from "lodash/noop";

import { localStorageKeys } from "src/constants/local-storage";
import { removeLocalStorage } from "src/utils/local-storage";
import { createErrorToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import userActions from "./user/actions";

export const createThunk = ({
  /**
   * Function called asynchronously that should return its result.
   *
   * Called with an object containing
   *  {
   *     args, // optional arguments provided when this thunk action is dispatched
   *     getState // function that returns the current redux state
   *  }
   */
  handler,

  // Array of functions that return an action (action creator or anonymous function calling an action creator)
  onStart = [],

  // Array of functions that return an action (action creator or anonymous function calling an action creator)
  // Each function is passed the result that is returned from `handler`
  onSuccess = [],

  // Array of functions that return an action (action creator or anonymous function calling an action creator)
  // Each function is passed the error that is caught from `handler`
  onFailure = [],
}) => {
  /**
   * @param {object} handlerArguments - the arguments to pass through to the handler
   * @callback callback - optional callback that is called after the thunk has either succeeded or failed
   */
  const thunk =
    (handlerArguments, callback = noop, catchUnauthorized = true) =>
    async (dispatch, getState) => {
      Promise.all(onStart.map((a) => dispatch(a())));

      try {
        const result = await handler({ args: handlerArguments, getState });
        await Promise.all(onSuccess.map((a) => dispatch(a(result))));
        callback(null, result);
      } catch (err) {
        const status = get(err, "response.status", false);

        // Handle all 401s
        if (status === 401 && catchUnauthorized) {
          removeLocalStorage(localStorageKeys.AUTH_TOKEN);
          dispatch(userActions.resetAuth());
          createErrorToast(toastMessages.UNAUTHORIZED);
          return;
        }

        const error = {
          message: get(err, "response.data.error", "An error has occured"),
          err,
        };

        await Promise.all(onFailure.map((a) => dispatch(a(error))));
        callback(err);
      }
    };

  return thunk;
};
