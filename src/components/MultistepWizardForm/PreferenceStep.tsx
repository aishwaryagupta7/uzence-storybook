import type { FormData } from './MultiStepForm.types';

interface PreferencesStepProps {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export const PreferenceStep = ({ data, onChange }:PreferencesStepProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Preferences</h3>
    <div>
      <label className="block text-sm font-medium mb-2">Notifications</label>
      <div className="space-y-2">
        {['email', 'sms', 'none'].map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name="notifications"
              value={option}
              checked={data.notifications === option}
              onChange={(e) => onChange({ notifications: e.target.value })}
              className="mr-2"
            />
            <span className="capitalize">{option}</span>
          </label>
        ))}
      </div>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="marketing"
        checked={data.marketing || false}
        onChange={(e) => onChange({ marketing: e.target.checked })}
        className="mr-2"
      />
      <label htmlFor="marketing" className="text-sm">Receive marketing emails</label>
    </div>
  </div>
);