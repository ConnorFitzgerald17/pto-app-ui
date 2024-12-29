import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import StatsCard from "src/components/stats-card";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    "en-US": enUS,
  },
});

// Mock vacation data
const mockVacations = [
  {
    title: "Beach Vacation",
    start: new Date(2024, 12, 15),
    end: new Date(2024, 12, 22),
    allDay: true,
    className: "bg-blue-200",
  },
  {
    title: "Mountain Retreat",
    start: new Date(2024, 11, 1),
    end: new Date(2024, 11, 7),
    allDay: true,
    className: "bg-green-200",
  },
  {
    title: "City Break",
    start: new Date(2024, 11, 10),
    end: new Date(2024, 11, 13),
    allDay: true,
    className: "bg-purple-200",
  },
];

// Mock stats data
const calendarStats = [
  {
    title: "Upcoming PTO",
    value: "3",
    icon: CalendarDaysIcon,
    iconColor: "text-blue-500",
    iconBgColor: "bg-blue-50",
  },
  {
    title: "Team Members Out",
    value: "2",
    icon: UserGroupIcon,
    iconColor: "text-emerald-500",
    iconBgColor: "bg-emerald-50",
  },
  {
    title: "Pending Requests",
    value: "5",
    icon: ClockIcon,
    iconColor: "text-yellow-500",
    iconBgColor: "bg-yellow-50",
  },
  {
    title: "Approved This Month",
    value: "8",
    icon: CheckCircleIcon,
    iconColor: "text-green-500",
    iconBgColor: "bg-green-50",
  },
];

export default function VacationCalendar() {
  return (
    <div className="p-6 mt-2">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Time Off Calendar
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage time off requests for your team
          </p>
        </div>
        <button className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Request Time Off
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        {calendarStats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="h-[800px]">
          <Calendar
            localizer={localizer}
            events={mockVacations}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            views={["month", "week", "day"]}
            defaultView="month"
            className="font-sans"
          />
        </div>
      </div>
    </div>
  );
}
