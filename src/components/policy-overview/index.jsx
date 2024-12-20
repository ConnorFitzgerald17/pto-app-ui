import { format } from "date-fns";

const PolicyOverview = ({ policy }) => {
  if (!policy) {
    return null;
  }

  const {
    name = "Untitled Policy",
    description = "No description provided",
    status = "INACTIVE",
    accrualRules = {},
    carryOver = {},
    restrictions = {},
  } = policy;

  const { frequency = "Not set", amount = 0, maxBalance = 0 } = accrualRules;

  const { allowed = false, maxDays = 0, expiryDate = null } = carryOver;

  const {
    minDaysNotice = 0,
    maxConsecutiveDays = 0,
    blackoutDates = [],
  } = restrictions;

  const formatDate = (date) => {
    try {
      return date ? format(new Date(date), "MMM dd, yyyy") : "Not set";
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Accrual Rules Card */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Accrual Rules
          </h3>
          <div className="space-y-2 text-sm">
            <p>Frequency: {frequency}</p>
            <p>Amount: {amount.toFixed(2)} days</p>
            <p>Max Balance: {maxBalance} days</p>
          </div>
        </div>

        {/* Carry Over Card */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Carry Over</h3>
          <div className="space-y-2 text-sm">
            <p>Allowed: {allowed ? "Yes" : "No"}</p>
            <p>Max Days: {maxDays}</p>
            <p>Expires: {formatDate(expiryDate)}</p>
          </div>
        </div>

        {/* Restrictions Card */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Restrictions
          </h3>
          <div className="space-y-2 text-sm">
            <p>Min Notice: {minDaysNotice} days</p>
            <p>Max Consecutive: {maxConsecutiveDays} days</p>
            <p>Blackout Periods: {blackoutDates.length}</p>
          </div>
        </div>
      </div>

      <button
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent 
                   text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Edit Policy Details
      </button>
    </div>
  );
};

export default PolicyOverview;
