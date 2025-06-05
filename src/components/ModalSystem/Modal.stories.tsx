// src/components/ModalSystem/Modal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import "../../App.css";
import ModalWrapper from './ModalWrapper';

const meta = {
  title: 'Components/ModalSystem',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
            # Advanced Modal System

            A comprehensive modal system with multiple variants, animations, and advanced features for React applications.

            ## Features
            - **Multiple Animations**: fade, scale, slide (up/down/left/right)
            - **Configurable Sizes**: small, medium, large, fullscreen
            - **Backdrop Options**: with/without blur effects
            - **Drawer Variants**: slide from any direction
            - **Stacked Modals**: support for multiple modals
            - **Loading States**: built-in spinner overlay
            - **Accessibility**: ARIA roles, keyboard navigation, focus trapping
            - **Responsive**: works on all screen sizes

            ## Components
            - \`Modal\`: Standard modal dialog
            - \`Drawer\`: Slide-in panel from any direction
            - \`ModalProvider\`: Context for managing stacked modals

            ## API
            ### Modal Props
            - \`isOpen\`: boolean - Controls modal visibility
            - \`onClose\`: function - Close handler
            - \`title\`: string - Modal title
            - \`size\`: 'small' | 'medium' | 'large' | 'fullscreen'
            - \`animation\`: 'fade' | 'scale' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight'
            - \`backdrop\`: boolean - Show backdrop
            - \`backdropBlur\`: boolean - Blur backdrop
            - \`closeOnBackdrop\`: boolean - Close on backdrop click
            - \`closeOnEscape\`: boolean - Close on Escape key
            - \`isLoading\`: boolean - Show loading state

            ### Drawer Props
            - Extends Modal props
            - \`position\`: 'left' | 'right' | 'top' | 'bottom'
            - \`width\`: string - Width for horizontal drawers
            - \`height\`: string - Height for vertical drawers

            ## Accessibility
            - ARIA dialog roles and labels
            - Focus management and trapping
            - Keyboard navigation (Tab, Shift+Tab, Escape)
            - Screen reader announcements
            - Focus restoration on close

            ## Best Practices
            - Use appropriate size for content
            - Provide clear close actions
            - Handle loading states gracefully
            - Keep content accessible
            - Use drawers for contextual actions
        `
      }
    }
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    size: { 
      control: 'select',
      options: ['small', 'medium', 'large', 'fullscreen']
    },
    animation: {
      control: 'select', 
      options: ['fade', 'scale', 'slideUp', 'slideDown', 'slideLeft', 'slideRight']
    },
    backdrop: { control: 'boolean' },
    backdropBlur: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    isLoading: { control: 'boolean' }
  }
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: "Default Modal",
    children: null
  },
  render: () => <ModalWrapper title="Default Modal" />,
};

export const Sizes: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: null
  },
  render: () => (
    <div className="space-x-4">
      <ModalWrapper size="small" title="Small Modal" />
      <ModalWrapper size="medium" title="Medium Modal" />
      <ModalWrapper size="large" title="Large Modal" />
      <ModalWrapper size="fullscreen" title="Fullscreen Modal" />
    </div>
  ),
};

export const Animations: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: null
  },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <ModalWrapper animation="fade" title="Fade Animation" />
      <ModalWrapper animation="scale" title="Scale Animation" />
      <ModalWrapper animation="slideUp" title="Slide Up" />
      <ModalWrapper animation="slideDown" title="Slide Down" />
      <ModalWrapper animation="slideLeft" title="Slide Left" />
      <ModalWrapper animation="slideRight" title="Slide Right" />
    </div>
  ),
};

export const WithBackdropBlur: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: null
  },
  render: () => (
    <div className="space-x-4">
      <ModalWrapper backdrop={true} backdropBlur={false} title="Normal Backdrop" />
      <ModalWrapper backdrop={true} backdropBlur={true} title="Blurred Backdrop" />
    </div>
  ),
};

export const LoadingState: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: null,
    isLoading: true
  },
  render: () => <ModalWrapper isLoading={true} loadingText="Processing..." title="Loading Modal" />,
};


export const DrawerPositions: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: null
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <ModalWrapper variant="drawer" position="left" title="Left Drawer" />
      <ModalWrapper variant="drawer" position="right" title="Right Drawer" />
      <ModalWrapper variant="drawer" position="top" title="Top Drawer" height="200px" />
      <ModalWrapper variant="drawer" position="bottom" title="Bottom Drawer" height="250px" />
    </div>
  ),
};

