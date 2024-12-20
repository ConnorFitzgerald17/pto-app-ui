import { createRequest } from "./create-request";

const getPolicies = () => {
  return createRequest("GET", "policy");
};

const policyService = {
  getPolicies,
};

export default policyService;
