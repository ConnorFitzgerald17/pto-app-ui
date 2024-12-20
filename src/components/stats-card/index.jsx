const StatsCard = ({ title, value, icon: Icon, iconColor, iconBgColor }) => (
  <div className="rounded-lg bg-white p-6 shadow">
    <div className="flex items-center gap-2">
      <Icon
        className={`h-6 w-6 ${iconColor} ${iconBgColor} rounded-full p-1`}
      />
      <div className="text-sm font-medium text-gray-500">{title}</div>
    </div>
    <div className="mt-2 text-3xl font-semibold text-gray-900">{value}</div>
  </div>
);

export default StatsCard;
