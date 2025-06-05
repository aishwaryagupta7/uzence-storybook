export const MODAL_SIZES = {
  small: 'w-full max-w-sm mx-4 sm:mx-auto',
  medium: 'w-full max-w-lg mx-4 sm:mx-auto', 
  large: 'w-full max-w-4xl mx-4 sm:mx-auto',
  fullscreen: 'w-full h-full',
} as const;

export const ANIMATIONS = {
  none: {
    enter: 'opacity-0 scale-95 sm:scale-90',
    enterActive: 'opacity-100 scale-100 transition-all duration-200 ease-out',
    exit: 'opacity-100 scale-100',
    exitActive: 'opacity-0 scale-95 sm:scale-90 transition-all duration-200 ease-in'
  },
  fade: {
    enter: 'opacity-0',
    enterActive: 'opacity-100 transition-opacity duration-300 ease-out',
    exit: 'opacity-100',
    exitActive: 'opacity-0 transition-opacity duration-300 ease-in'
  },
  scale: {
    enter: 'opacity-0 scale-90 sm:scale-80',
    enterActive: 'opacity-100 scale-100 transition-all duration-300 ease-out',
    exit: 'opacity-100 scale-100',
    exitActive: 'opacity-0 scale-90 sm:scale-80 transition-all duration-300 ease-in'
  },
  slideUp: {
    enter: 'opacity-0 translate-y-8 sm:translate-y-15',
    enterActive: 'opacity-100 translate-y-0 transition-all duration-300 ease-out',
    exit: 'opacity-100 translate-y-0',
    exitActive: 'opacity-0 translate-y-4 transition-all duration-300 ease-in'
  },
  slideDown: {
    enter: 'opacity-0 -translate-y-8 sm:-translate-y-15',
    enterActive: 'opacity-100 translate-y-0 transition-all duration-300 ease-out',
    exit: 'opacity-100 translate-y-0',
    exitActive: 'opacity-0 -translate-y-4 transition-all duration-300 ease-in'
  },
  slideLeft: {
    enter: 'opacity-0 translate-x-8 sm:translate-x-15',
    enterActive: 'opacity-100 translate-x-0 transition-all duration-300 ease-out',
    exit: 'opacity-100 translate-x-0',
    exitActive: 'opacity-0 translate-x-4 transition-all duration-300 ease-in'
  },
  slideRight: {
    enter: 'opacity-0 -translate-x-8 sm:-translate-x-10',
    enterActive: 'opacity-100 translate-x-0 transition-all duration-300 ease-out',
    exit: 'opacity-100 translate-x-0',
    exitActive: 'opacity-0 -translate-x-8 sm:-translate-x-10 transition-all duration-300 ease-in'
  }
} as const;

export const DRAWER_CONFIG = {
  left: {
    containerAlignment: 'justify-start items-stretch',
    drawerSize: 'h-full w-full max-w-xs sm:max-w-sm',
    cornerStyle: 'rounded-r-lg sm:rounded-r-xl',
    slideDirection: {
      hidden: '-translate-x-full',
      visible: 'translate-x-0'
    }
  },
  right: {
    containerAlignment: 'justify-end items-stretch',
    drawerSize: 'h-full w-full max-w-xs sm:max-w-sm',
    cornerStyle: 'rounded-l-lg sm:rounded-l-xl',
    slideDirection: {
      hidden: 'translate-x-full',
      visible: 'translate-x-0'
    }
  },
  top: {
    containerAlignment: 'items-start justify-stretch',
    drawerSize: 'w-full h-full max-h-80 sm:max-h-96',
    cornerStyle: 'rounded-b-lg sm:rounded-b-xl',
    slideDirection: {
      hidden: '-translate-y-full',
      visible: 'translate-y-0'
    }
  },
  bottom: {
    containerAlignment: 'items-end justify-stretch',
    drawerSize: 'w-full max-h-80 sm:max-h-96',
    cornerStyle: 'rounded-t-lg sm:rounded-t-xl',
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
  width: '100%',
  height: 'auto'
} as const;

// Additional responsive utility classes
export const RESPONSIVE_CLASSES = {
  modal: {
    container: 'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6',
    backdrop: 'fixed inset-0 bg-black/50 backdrop-blur-sm',
    content: 'relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto',
    header: 'p-4 sm:p-6 border-b',
    body: 'p-4 sm:p-6',
    footer: 'p-4 sm:p-6 border-t bg-gray-50'
  },
  drawer: {
    container: 'fixed inset-0 z-50 flex',
    backdrop: 'fixed inset-0 bg-black/50 backdrop-blur-sm',
    content: 'relative bg-white shadow-xl overflow-y-auto',
    header: 'p-4 sm:p-6 border-b sticky top-0 bg-white z-10',
    body: 'p-4 sm:p-6 flex-1',
    footer: 'p-4 sm:p-6 border-t bg-gray-50 sticky bottom-0'
  },
  buttons: {
    primary: 'w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors',
    secondary: 'w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors',
    ghost: 'w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors'
  }
} as const;

// Mobile-first breakpoint utilities
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

// Touch-friendly sizes for mobile
export const TOUCH_TARGETS = {
  minHeight: 'min-h-[44px]', // 44px minimum for touch targets
  minWidth: 'min-w-[44px]',
  padding: 'p-3 sm:p-2', // Larger padding on mobile
  margin: 'm-2 sm:m-1'
} as const;