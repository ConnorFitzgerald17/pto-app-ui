import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { PERMISSIONS_NEW } from "src/constants/permissions";

// Mock data for PTO-specific stats
const ptoStats = [
  {
    label: "Available PTO",
    value: "12 days",
    change: "2 days accrued",
    trend: "up",
    icon: CalendarDaysIcon,
  },
  {
    label: "Pending Requests",
    value: "2",
    change: "1 new",
    trend: "up",
    icon: ClockIcon,
  },
  {
    label: "Team Out Today",
    value: "3",
    change: "+1 from yesterday",
    trend: "up",
    icon: UserGroupIcon,
  },
  {
    label: "Approved This Month",
    value: "15",
    change: "+5 from last month",
    trend: "up",
    icon: CheckCircleIcon,
  },
];

// Mock data for recent PTO activity
const recentPtoActivity = [
  {
    id: 1,
    user: "John Doe",
    action: "PTO Request Approved",
    dates: "Dec 24-26",
    status: "approved",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Submitted PTO Request",
    dates: "Jan 15-19",
    status: "pending",
    time: "4 hours ago",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Cancelled PTO Request",
    dates: "Dec 31",
    status: "cancelled",
    time: "1 day ago",
  },
];

// Mock data for upcoming team PTO
const upcomingTeamPto = [
  { name: "Sarah Wilson", dates: "Dec 24-26", status: "approved" },
  { name: "James Brown", dates: "Dec 26-29", status: "approved" },
  { name: "Emily Davis", dates: "Jan 2-5", status: "pending" },
];

const RootRoute = () => {
  const userDetails = useSelector((state) => state.user.details);
  const userPermissions = userDetails?.role?.permissions || [];

  const canViewTeamPto = userPermissions.includes(
    PERMISSIONS_NEW.VIEW_TEAM_PTO,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PTO Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {userDetails.firstName}!
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          Request Time Off
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {ptoStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <span
                    className={`ml-2 text-sm ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PTO Calendar Overview */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Your PTO Calendar
            </h2>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <p className="text-gray-500">Calendar Integration Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentPtoActivity.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div
                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.status === "approved"
                        ? "bg-green-100"
                        : activity.status === "pending"
                        ? "bg-yellow-100"
                        : "bg-red-100"
                    }`}
                  >
                    <CheckCircleIcon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.dates}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team PTO Overview - Only shown if user has permission */}
      {canViewTeamPto && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Team PTO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingTeamPto.map((member, index) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-500">{member.dates}</p>
                <span
                  className={`inline-flex mt-2 px-2 py-1 text-xs rounded-full ${
                    member.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RootRoute;
