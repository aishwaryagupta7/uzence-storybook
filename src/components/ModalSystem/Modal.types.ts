import type { ReactNode } from 'react';

export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';
export type ModalAnimation = 'fade' | 'scale' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight'| 'none';
export type ModalVariant = 'modal' | 'drawer';
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  backdrop?: boolean;
  backdropBlur?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  zIndex?: number;
}

export interface ModalProps extends BaseModalProps {
  size?: ModalSize;
  animation?: ModalAnimation;
  variant?: ModalVariant;
  // Drawer-specific props (only used when variant='drawer')
  position?: DrawerPosition;
  width?: string;
  height?: string;
}

// Legacy DrawerProps interface for backward compatibility
export interface DrawerProps extends BaseModalProps {
  position?: DrawerPosition;
  width?: string;
  height?: string;
}