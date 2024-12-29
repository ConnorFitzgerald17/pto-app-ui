import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BuildingOfficeIcon,
  ClockIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import orgThunks from "src/state/org/thunks";
import Button from "src/components/button";
import Input from "src/components/input";
import Select from "src/components/select";
import LoadingSpinner from "src/components/loading-spinner";

// Mock data - replace with actual API integration
const timezones = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
];

const workWeekOptions = [
  { value: "MONDAY_FRIDAY", label: "Monday to Friday" },
  { value: "SUNDAY_THURSDAY", label: "Sunday to Thursday" },
  { value: "CUSTOM", label: "Custom" },
];

export default function OrganizationSettings() {
  const dispatch = useDispatch();
  const orgLoading = useSelector((state) => state.org.isLoading);
  const [isEditing, setIsEditing] = useState(false);

  // Mock initial data - replace with Redux state
  const [orgSettings, setOrgSettings] = useState({
    name: "Acme Corp",
    timezone: "America/New_York",
    workWeek: "MONDAY_FRIDAY",
    workHours: {
      start: "09:00",
      end: "17:00",
    },
    fiscalYearStart: "01-01",
  });

  const handleSave = async () => {
    try {
      // await dispatch(orgThunks.updateOrgSettings(orgSettings));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update organization settings:", error);
    }
  };

  return (
    <div className="p-6 mt-2">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Organization Settings (TODO)
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your organization&apos;s basic configuration
          </p>
        </div>
        <div className="flex gap-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Settings</Button>
          ) : (
            <>
              <Button variant="tertiary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          )}
        </div>
      </div>

      {/* Settings Form */}
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {/* Organization Name */}
        <div className="p-6">
          <div className="max-w-lg">
            <label className="block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <div className="mt-1">
              <Input
                type="text"
                value={orgSettings.name}
                onChange={(e) =>
                  setOrgSettings({ ...orgSettings, name: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="p-6">
          <div className="max-w-lg">
            <label className="block text-sm font-medium text-gray-700">
              Organization Timezone
            </label>
            <div className="mt-1">
              <Select
                value={orgSettings.timezone}
                onChange={(value) =>
                  setOrgSettings({ ...orgSettings, timezone: value })
                }
                options={timezones}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Work Week */}
        <div className="p-6">
          <div className="max-w-lg">
            <label className="block text-sm font-medium text-gray-700">
              Work Week
            </label>
            <div className="mt-1">
              <Select
                value={orgSettings.workWeek}
                onChange={(value) =>
                  setOrgSettings({ ...orgSettings, workWeek: value })
                }
                options={workWeekOptions}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Work Hours */}
        <div className="p-6">
          <div className="max-w-lg">
            <label className="block text-sm font-medium text-gray-700">
              Work Hours
            </label>
            <div className="mt-1 flex items-center gap-4">
              <Input
                type="time"
                value={orgSettings.workHours.start}
                onChange={(e) =>
                  setOrgSettings({
                    ...orgSettings,
                    workHours: {
                      ...orgSettings.workHours,
                      start: e.target.value,
                    },
                  })
                }
                disabled={!isEditing}
              />
              <span className="text-gray-500">to</span>
              <Input
                type="time"
                value={orgSettings.workHours.end}
                onChange={(e) =>
                  setOrgSettings({
                    ...orgSettings,
                    workHours: {
                      ...orgSettings.workHours,
                      end: e.target.value,
                    },
                  })
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Fiscal Year Start */}
        <div className="p-6">
          <div className="max-w-lg">
            <label className="block text-sm font-medium text-gray-700">
              Fiscal Year Start
            </label>
            <div className="mt-1">
              <Input
                type="date"
                value={orgSettings.fiscalYearStart}
                onChange={(e) =>
                  setOrgSettings({
                    ...orgSettings,
                    fiscalYearStart: e.target.value,
                  })
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
