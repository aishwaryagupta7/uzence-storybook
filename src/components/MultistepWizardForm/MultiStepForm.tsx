// src/components/MultiStepWizardForm/MultiStepForm.tsx
import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, User, Settings, CheckCircle } from 'lucide-react';
import type { MultiStepFormProps, FormData, WizardStep } from './MultiStepForm.types';

const steps: WizardStep[] = [
  { id: 'personal', title: 'Personal Info' },
  { id: 'preferences', title: 'Preferences', optional: true },
  { id: 'review', title: 'Review' }
];

const PersonalStep: React.FC<{
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  errors: Record<string, string>;
}> = ({ data, onChange, errors }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">First Name *</label>
        <input
          type="text"
          value={data.firstName || ''}
          onChange={(e) => onChange({ firstName: e.target.value })}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.firstName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter first name"
        />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Last Name *</label>
        <input
          type="text"
          value={data.lastName || ''}
          onChange={(e) => onChange({ lastName: e.target.value })}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.lastName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter last name"
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Email *</label>
      <input
        type="email"
        value={data.email || ''}
        onChange={(e) => onChange({ email: e.target.value })}
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          errors.email ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="Enter email address"
      />
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
    </div>
  </div>
);

const PreferencesStep: React.FC<{
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  errors: Record<string, string>;
}> = ({ data, onChange }) => (
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

const ReviewStep: React.FC<{ data: FormData }> = ({ data }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Review Your Information</h3>
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Notifications:</strong> {data.notifications || 'Not selected'}</p>
      <p><strong>Marketing:</strong> {data.marketing ? 'Yes' : 'No'}</p>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="terms"
        checked={data.terms || false}
        className="mr-2"
      />
      <label htmlFor="terms" className="text-sm">I agree to the terms and conditions *</label>
    </div>
  </div>
);

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  onComplete,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (stepIndex === 0) {
      if (!data.firstName?.trim()) newErrors.firstName = 'First name is required';
      if (!data.lastName?.trim()) newErrors.lastName = 'Last name is required';
      if (!data.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        newErrors.email = 'Invalid email format';
      }
    }
    
    if (stepIndex === 2 && !data.terms) {
      newErrors.terms = 'Please accept terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) return;

    setCompletedSteps(prev => new Set([...prev, currentStep]));

    if (currentStep === steps.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        onComplete?.(data);
        setIsLoading(false);
      }, 1000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  const handleSkip = () => {
    if (steps[currentStep].optional) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleDataChange = (newData: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...newData }));
    setErrors({});
  };

  const getStepIcon = (index: number) => {
    if (completedSteps.has(index)) return <Check className="w-5 h-5" />;
    if (index === 0) return <User className="w-5 h-5" />;
    if (index === 1) return <Settings className="w-5 h-5" />;
    return <CheckCircle className="w-5 h-5" />;
  };

  return (
    <div className={`max-w-2xl mx-auto bg-white rounded-lg shadow-lg ${className}`}>
      {/* Progress Indicator */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
                    completedSteps.has(index)
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {getStepIcon(index)}
                </div>
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${
                    index === currentStep ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                    {step.optional && ' (Optional)'}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  completedSteps.has(index) ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 min-h-[400px]">
        <div className="transition-all duration-300">
          {currentStep === 0 && (
            <PersonalStep data={data} onChange={handleDataChange} errors={errors} />
          )}
          {currentStep === 1 && (
            <PreferencesStep data={data} onChange={handleDataChange} errors={errors} />
          )}
          {currentStep === 2 && <ReviewStep data={data} />}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="flex space-x-2">
          {steps[currentStep]?.optional && currentStep < steps.length - 1 && (
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Skip
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={isLoading}
            className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              'Processing...'
            ) : currentStep === steps.length - 1 ? (
              'Complete'
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};