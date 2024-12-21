import { createRequest } from "./create-request";

const getPolicies = () => {
  return createRequest("GET", "policy");
};

const createPolicy = (policy) => {
  return createRequest("POST", "policy", policy);
};

const policyService = {
  getPolicies,
  createPolicy,
};

export default policyService;
