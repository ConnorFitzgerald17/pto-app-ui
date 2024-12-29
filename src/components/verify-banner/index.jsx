import { XMarkIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import React, { useState } from "react";
import userService from "src/services/user";
import { createSuccessToast, createErrorToast } from "src/utils/create-toast";
import { toastMessages } from "src/constants/toast-messages";
import { localStorageKeys } from "src/constants/local-storage";
import userActions from "src/state/user/actions";
import { removeLocalStorage } from "src/utils/local-storage";

const VerifyBanner = () => {
  const userDetails = useSelector((state) => state.user.details);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

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

  if (!userDetails || userDetails?.isVerified || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8 z-50">
      <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
        <p className="text-sm/6 text-white">
          <span>
            <strong className="font-semibold">Verify your email</strong>
            <svg
              viewBox="0 0 2 2"
              aria-hidden="true"
              className="mx-2 inline size-0.5 fill-current"
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            Please verify your email
            <button
              onClick={handleResend}
              className="ml-3 font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Resend email<span aria-hidden="true">&rarr;</span>
            </button>
          </span>
        </p>
        <button
          type="button"
          className="-m-1.5 flex-none p-1.5"
          onClick={() => setIsVisible(false)}
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default VerifyBanner;
