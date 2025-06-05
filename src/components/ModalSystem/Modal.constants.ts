

export const MODAL_SIZES = {
    small: 'max-w-sm',
    medium: 'max-w-lg', 
    large: 'max-w-4xl',
    fullscreen: 'w-full h-full',
  } as const;
  
export const ANIMATIONS = {
    none: {
      enter: 'opacity-0 scale-90',
      enterActive: 'opacity-100 scale-100 transition-all duration-200 ease-out',
      exit: 'opacity-100 scale-100',
      exitActive: 'opacity-0 scale-90 transition-all duration-200 ease-in'
    },
    fade: {
      enter: 'opacity-0',
      enterActive: 'opacity-100 transition-opacity duration-300 ease-out',
      exit: 'opacity-100',
      exitActive: 'opacity-0 transition-opacity duration-300 ease-in'
    },
    scale: {
      enter: 'opacity-0 scale-80',
      enterActive: 'opacity-100 scale-100 transition-all duration-300 ease-out',
      exit: 'opacity-100 scale-100',
      exitActive: 'opacity-0 scale-80 transition-all duration-300 ease-in'
    },
    slideUp: {
      enter: 'opacity-0 translate-y-15',
      enterActive: 'opacity-100 translate-y-0 transition-all duration-300 ease-out',
      exit: 'opacity-100 translate-y-0',
      exitActive: 'opacity-0 translate-y-4 transition-all duration-300 ease-in'
    },
    slideDown: {
      enter: 'opacity-0 -translate-y-15',
      enterActive: 'opacity-100 translate-y-0 transition-all duration-300 ease-out',
      exit: 'opacity-100 translate-y-0',
      exitActive: 'opacity-0 -translate-y-4 transition-all duration-300 ease-in'
    },
    slideLeft: {
      enter: 'opacity-0 translate-x-15',
      enterActive: 'opacity-100 translate-x-0 transition-all duration-300 ease-out',
      exit: 'opacity-100 translate-x-0',
      exitActive: 'opacity-0 translate-x-4 transition-all duration-300 ease-in'
    },
    slideRight: {
      enter: 'opacity-0 -translate-x-10',
      enterActive: 'opacity-100 translate-x-0 transition-all duration-300 ease-out',
      exit: 'opacity-100 translate-x-0',
      exitActive: 'opacity-0 -translate-x-10 transition-all duration-300 ease-in'
    }
} as const;
  
export const DRAWER_CONFIG = {
    left: {
      containerAlignment: 'justify-start items-stretch',
      drawerSize: 'h-full max-w-sm',
      cornerStyle: 'rounded-r-lg',
      slideDirection: {
        hidden: '-translate-x-full',
        visible: 'translate-x-0'
      }
    },
    right: {
      containerAlignment: 'justify-end items-stretch',
      drawerSize: 'h-full max-w-sm',
      cornerStyle: 'rounded-l-lg',
      slideDirection: {
        hidden: 'translate-x-full',
        visible: 'translate-x-0'
      }
    },
    top: {
      containerAlignment: 'items-start justify-stretch',
      drawerSize: 'w-full max-h-96',
      cornerStyle: 'rounded-b-lg',
      slideDirection: {
        hidden: '-translate-y-full',
        visible: 'translate-y-0'
      }
    },
    bottom: {
      containerAlignment: 'items-end justify-stretch',
      drawerSize: 'w-full max-h-96',
      cornerStyle: 'rounded-t-lg',
      slideDirection: {
        hidden: 'translate-y-full',
        visible: 'translate-y-0'
      }
    }
} as const;
  
export const DEFAULT_PROPS = {
    size: 'medium',
    animation: 'none',
    backdrop: true,
    backdropBlur: false,
    closeOnBackdrop: true,
    closeOnEscape: true,
    showCloseButton: true,
    isLoading: false,
    loadingText: 'Loading...',
    className: '',
    overlayClassName: '',
    contentClassName: '',
    zIndex: 50,
    variant: 'modal',
    position: 'right',
    width: '400px',
    height: '300px'
} as const;