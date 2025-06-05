// src/components/MultiStepWizardForm/MultiStepForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MultiStepForm } from './MultiStepForm';

const meta = {
  title: 'Components/MultiStepForm',
  component: MultiStepForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
          # Multi-Step Wizard Form

          A comprehensive form component that guides users through multiple steps with progress tracking, validation, and smooth transitions.

          ## Features
          - **Progress Indicator**: Visual progress with step completion status
          - **Form Validation**: Real-time validation with error messages
          - **Navigation**: Next/Previous/Skip functionality
          - **Responsive Design**: Works on all screen sizes
          - **Accessibility**: ARIA labels, keyboard navigation, focus management
          - **TypeScript**: Full type safety

          ## API
          - \`onComplete\`: Callback fired when form is completed
          - \`className\`: Additional CSS classes

          ## States
          - Loading state during form submission
          - Error states with validation messages
          - Completed steps with checkmarks
          - Optional step handling

          ## Accessibility
          - ARIA roles and labels
          - Keyboard navigation support
          - Focus management between steps
          - Screen reader friendly
        `
      }
    }
  },
  argTypes: {
    onComplete: { action: 'completed' },
    className: { control: 'text' }
  }
} satisfies Meta<typeof MultiStepForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onComplete: (data) => {
      console.log('Form completed:', data);
      alert('Form submitted successfully!');
    }
  }
};

export const WithCustomClass: Story = {
  args: {
    className: 'border-2 border-blue-200',
    onComplete: (data) => console.log('Form data:', data)
  }
};

export const Interactive: Story = {
  args: {
    onComplete: (data) => {
      console.log('Submitted data:', data);
      alert(`Welcome ${data.firstName} ${data.lastName}! Check console for full data.`);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example - fill out the form and submit to see the completion handler in action.'
      }
    }
  }
};