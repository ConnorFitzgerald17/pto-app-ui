import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getLocalStorage, removeLocalStorage } from "src/utils/local-storage";
import { localStorageKeys } from "src/constants/local-storage";
import userActions from "src/state/user/actions";
import userThunks from "src/state/user/thunks";

export const useAuth = ({ authRedirect = false, unauthRedirect = false }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      const token = getLocalStorage(localStorageKeys.AUTH_TOKEN);

      // If there is a token, attempt to fetch user
      if (token) {
        // Fetch user
        dispatch(
          userThunks.getUser(
            {},
            (err) => {
              if (!err && authRedirect) {
                navigate(authRedirect);
              }
              if (err) {
                removeLocalStorage(localStorageKeys.AUTH_TOKEN);
                navigate("/login");
              }
            },
            false,
          ),
        );
      } else if (unauthRedirect) {
        navigate(unauthRedirect);
      }

      dispatch(userActions.setLoading(false));
    } else if (authRedirect) {
      navigate(authRedirect);
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);
};
