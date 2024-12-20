import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

export default function VacationCalendar() {
  return (
    <div className="h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Vacation Calendar
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg h-[800px]">
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
