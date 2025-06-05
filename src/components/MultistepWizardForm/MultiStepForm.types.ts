export interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  notifications?: string;
  marketing?: boolean;
  terms?: boolean;
}

export interface WizardStep {
  id: string;
  title: string;
  optional?: boolean;
}

export interface MultiStepFormProps {
  onComplete?: (data: FormData) => void;
  className?: string;
  allowSkip?: boolean;
}

export interface StepProps {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  errors: Record<string, string>;
}