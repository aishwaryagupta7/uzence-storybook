import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, User, Settings, CheckCircle } from 'lucide-react';
import type { MultiStepFormProps, FormData, WizardStep } from './MultiStepForm.types';
import { PersonalStep } from './PersonalStep';
import { PreferenceStep } from './PreferenceStep';
import { ReviewStep } from './ReviewStep';

const steps: WizardStep[] = [
  { id: 'personal', title: 'Personal Info' },
  { id: 'preferences', title: 'Preferences', optional: true },
  { id: 'review', title: 'Review' }
];

export const MultiStepForm = ({
  onComplete,
  className = '',
  allowSkip= true
}:MultiStepFormProps) => {
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalStep data={data} onChange={handleDataChange} errors={errors} />;
      case 1:
        return <PreferenceStep data={data} onChange={handleDataChange} />;
      case 2:
        return <ReviewStep data={data} onChange={handleDataChange} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className={`max-w-2xl mx-auto bg-white rounded-lg shadow-lg ${className}`}>
      {/* Progress Header */}
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
      <div className="p-6 h-[55vh]">
        <div className="transition-all duration-300">
          {renderStepContent()}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="p-5 border-t bg-gray-50 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer disabled:opacity-50  disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="flex space-x-2">
          {steps[currentStep]?.optional && allowSkip && currentStep < steps.length - 1 && (
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Skip
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={isLoading}
            className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
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