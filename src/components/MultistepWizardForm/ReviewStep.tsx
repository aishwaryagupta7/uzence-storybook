import type { FormData } from './MultiStepForm.types';

interface ReviewStepProps {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export const ReviewStep = ({ data, onChange, errors }:ReviewStepProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Review Your Information</h3>
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Notifications:</strong> {data.notifications || 'Not selected'}</p>
      <p><strong>Marketing:</strong> {data.marketing ? 'Yes' : 'No'}</p>
    </div>
    <div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          checked={data.terms || false}
          onChange={(e) => onChange({ terms: e.target.checked })}
          className="mr-2 cursor-pointer"
        />
        <label htmlFor="terms" className="text-sm">I agree to the terms and conditions *</label>
      </div>
      {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
    </div>
  </div>
);