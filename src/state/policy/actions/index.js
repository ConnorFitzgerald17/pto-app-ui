import { resetPolicy } from "./reset-policy";
import { setPolicyLoading } from "./set-policy-loading";
import { setPolicy } from "./set-policy";

export const types = Object.freeze({
  SET_POLICY_LOADING: "policy::set-policy-loading",
  SET_POLICY: "policy::set-policy",
  RESET_POLICY: "policy::reset-policy",
});

const policyActions = {
  resetPolicy,
  setPolicyLoading,
  setPolicy,
};

export default policyActions;
