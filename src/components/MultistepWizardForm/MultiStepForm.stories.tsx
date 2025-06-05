import type { Meta, StoryObj } from '@storybook/react';
import { MultiStepForm } from './MultiStepForm';

// Fallback action function for Storybook 9.0.5
const action = (name: string) => {
  return (...args: any[]) => {
    console.log(`[${name}]`, ...args);
    // This mimics the behavior of @storybook/addon-actions
    if (window && (window as any).__STORYBOOK_ADDONS_CHANNEL__) {
      (window as any).__STORYBOOK_ADDONS_CHANNEL__.emit('storybook/actions/action-event', {
        id: name,
        data: { name, args }
      });
    }
  };
};

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

export const WithLoadingState: Story = {
  args: {
    onComplete: (data) => {
      action('form-completed')(data);
      
      // Simulate API call with loading state
      const loadingAlert = () => {
        const loader = document.createElement('div');
        loader.innerHTML = 'Submitting form...';
        loader.style.cssText = 'position:fixed;top:20px;right:20px;background:#3b82f6;color:white;padding:12px 20px;border-radius:8px;z-index:1000;';
        document.body.appendChild(loader);
        
        setTimeout(() => {
          document.body.removeChild(loader);
          alert(`Success! Welcome ${data.firstName} ${data.lastName}!`);
        }, 2000);
      };
      
      loadingAlert();
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates handling loading states during form submission. The form shows loading feedback while processing the submission.'
      }
    }
  }
};

export const NoSkipping: Story = {
  args: {
    onComplete: action('form-completed'),
    allowSkip: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with skip functionality disabled. All steps become mandatory, ensuring complete data collection.'
      }
    }
  }
};