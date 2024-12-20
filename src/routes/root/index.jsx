import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";
import React from "react";

import { removeLocalStorage } from "src/utils/local-storage";
import { localStorageKeys } from "src/constants/local-storage";
import { useAuth } from "src/hooks/use-auth";
import { createErrorToast, createSuccessToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import Button from "src/components/button";
import userActions from "src/state/user/actions";
import userService from "src/services/user";

const RootRoute = () => {
  useAuth({ unauthRedirect: "/login" });
  const isLoading = useSelector((state) => state.user.isLoading);
  const userDetails = useSelector((state) => state.user.details);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userActions.resetAuth());
    createSuccessToast(toastMessages.LOGOUT_SUCCESSFUL);
    removeLocalStorage(localStorageKeys.AUTH_TOKEN);
    navigate("/login");
  };

  const handleResend = async () => {
    try {
      await userService.resendVerification();
      createSuccessToast(toastMessages.VERIFY_RESEND_SUCCESSFUL);
    } catch (err) {
      const status = get(err, "response.status", 500);
      if (status === 401) {
        dispatch(userActions.resetAuth());
        createErrorToast(toastMessages.UNAUTHORIZED);
        removeLocalStorage(localStorageKeys.AUTH_TOKEN);
        navigate("/login");
      } else {
        createErrorToast(toastMessages.ERROR);
      }
    }
  };

  if (isLoading || !userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md p-10">
      <h1 className="text-xl mb-2">Home</h1>
      <div>Welcome back, {userDetails.firstName}!</div>
      {!userDetails.isVerified && (
        <Button onClick={handleResend}>Resend Verification</Button>
      )}
      <br />
      <Button variant="tertiary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default RootRoute;
