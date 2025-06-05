import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { ModalProps } from './Modal.types';
import { MODAL_SIZES, ANIMATIONS, DRAWER_CONFIG, DEFAULT_PROPS } from './Modal.constants';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = DEFAULT_PROPS.size,
  animation = DEFAULT_PROPS.animation,
  backdrop = DEFAULT_PROPS.backdrop,
  backdropBlur = DEFAULT_PROPS.backdropBlur,
  closeOnBackdrop = DEFAULT_PROPS.closeOnBackdrop,
  closeOnEscape = DEFAULT_PROPS.closeOnEscape,
  showCloseButton = DEFAULT_PROPS.showCloseButton,
  isLoading = DEFAULT_PROPS.isLoading,
  loadingText = DEFAULT_PROPS.loadingText,
  className = DEFAULT_PROPS.className,
  overlayClassName = DEFAULT_PROPS.overlayClassName,
  contentClassName = DEFAULT_PROPS.contentClassName,
  zIndex = DEFAULT_PROPS.zIndex,
  variant = DEFAULT_PROPS.variant,
  position = DEFAULT_PROPS.position,
  width = DEFAULT_PROPS.width,
  height = DEFAULT_PROPS.height
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const isDrawer = variant === 'drawer';

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose, closeOnEscape]);

  useEffect(() => {
    if (isOpen && !shouldRender) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else if (!isOpen && shouldRender) {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };
  

  const getAnimation = () => {
    if (isDrawer) {
      const config = DRAWER_CONFIG[position];
      const slidePosition = isAnimating ? config.slideDirection.visible : config.slideDirection.hidden;
      return `transform transition-transform duration-300 ease-out ${slidePosition}`;
    }

    const animConfig = ANIMATIONS[animation];
    if (!isOpen && isAnimating) return animConfig.exitActive;
    if (isOpen && isAnimating) return animConfig.enterActive;
    if (isOpen && !isAnimating) return animConfig.enter;
    return animConfig.exit;
  };

  const overlayClasses = `
    fixed inset-0 z-${zIndex} flex
    ${isDrawer ? DRAWER_CONFIG[position].containerAlignment : 'items-center justify-center p-4'}
    ${backdrop ? 'bg-black/30' : ''}
    ${backdrop && backdropBlur ? '' : 'bg-gray-500 backdrop-blur-lg'}
    ${isAnimating ? 'opacity-100' : 'opacity-0'}
    ${overlayClassName}
  `;

  const getModalClasses = () => {
    const baseClasses = 'relative bg-white shadow-xl flex flex-col';
    
    if (isDrawer) {
      const config = DRAWER_CONFIG[position];
      return `${baseClasses} ${config.drawerSize} ${config.cornerStyle} ${getAnimation()} ${contentClassName}`;
    }

    return `${baseClasses} rounded-lg w-full ${MODAL_SIZES[size]} ${getAnimation()} ${contentClassName}`;
  };

  const getCustomSize = () => {
    if (!isDrawer) return {};
    const isHorizontal = position === 'left' || position === 'right';
    return isHorizontal ? { width } : { height };
  };
  

  return (
    <div
      className={overlayClasses}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? `${variant}-title` : undefined}
    >
      <div
        ref={modalRef}
        className={`${getModalClasses()} ${className}`}
        style={getCustomSize()}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
            <div className="flex flex-col items-center space-y-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              <span className="text-sm text-gray-600 font-medium">{loadingText}</span>
            </div>
          </div>
        )}

        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            {title && (
              <h2 
                id={`${variant}-title`} 
                className="font-semibold text-gray-900 text-lg truncate pr-2"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                aria-label={`Close ${variant}`}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};