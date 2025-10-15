// Error Animation Patterns and Micro-interactions
// This file defines reusable animation patterns for error states

import { tokens } from './tokens';

export const errorAnimations = {
  // Form Field Error Animations
  formField: {
    // Shake animation for validation errors
    shake: {
      name: 'errorShake',
      keyframes: `
        @keyframes errorShake {
          0%, 100% { 
            transform: translateX(0); 
          }
          10%, 30%, 50%, 70%, 90% { 
            transform: translateX(-4px); 
          }
          20%, 40%, 60%, 80% { 
            transform: translateX(4px); 
          }
        }
      `,
      duration: '500ms',
      easing: 'ease-in-out',
      iterationCount: 1,
      usage: 'Apply to form fields when validation fails',
    },

    // Fade in for error messages
    fadeIn: {
      name: 'errorFadeIn',
      keyframes: `
        @keyframes errorFadeIn {
          0% { 
            opacity: 0;
            transform: translateY(-4px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `,
      duration: '200ms',
      easing: tokens.transitions.easing.standard,
      iterationCount: 1,
      usage: 'Apply to error messages when they appear',
    },

    // Pulse for error icons
    iconPulse: {
      name: 'errorIconPulse',
      keyframes: `
        @keyframes errorIconPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `,
      duration: '600ms',
      easing: 'ease-in-out',
      iterationCount: 2,
      usage: 'Apply to error icons for emphasis',
    },

    // Border flash
    borderFlash: {
      name: 'errorBorderFlash',
      keyframes: `
        @keyframes errorBorderFlash {
          0% { 
            border-color: ${tokens.colors.semantic.error[500]};
            box-shadow: 0 0 0 0 ${tokens.colors.semantic.error[200]};
          }
          50% { 
            border-color: ${tokens.colors.semantic.error[600]};
            box-shadow: 0 0 0 4px ${tokens.colors.semantic.error[200]};
          }
          100% { 
            border-color: ${tokens.colors.semantic.error[500]};
            box-shadow: 0 0 0 0 ${tokens.colors.semantic.error[200]};
          }
        }
      `,
      duration: '400ms',
      easing: 'ease-out',
      iterationCount: 1,
      usage: 'Apply to form field borders on error',
    },
  },

  // Page-level Error Animations
  page: {
    // Float animation for 404 illustrations
    float: {
      name: 'errorFloat',
      keyframes: `
        @keyframes errorFloat {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-20px); 
          }
        }
      `,
      duration: '3s',
      easing: 'ease-in-out',
      iterationCount: 'infinite',
      usage: 'Apply to 404 page illustrations',
    },

    // Glitch effect for server errors
    glitch: {
      name: 'errorGlitch',
      keyframes: `
        @keyframes errorGlitch {
          0% { 
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          20% { 
            transform: translate(-2px, 2px);
            filter: hue-rotate(90deg);
          }
          40% { 
            transform: translate(-2px, -2px);
            filter: hue-rotate(180deg);
          }
          60% { 
            transform: translate(2px, 2px);
            filter: hue-rotate(270deg);
          }
          80% { 
            transform: translate(2px, -2px);
            filter: hue-rotate(360deg);
          }
          100% { 
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
        }
      `,
      duration: '3s',
      easing: 'ease-in-out',
      iterationCount: 'infinite',
      usage: 'Apply to 500 error illustrations',
    },

    // Bounce in for error content
    bounceIn: {
      name: 'errorBounceIn',
      keyframes: `
        @keyframes errorBounceIn {
          0% { 
            opacity: 0;
            transform: scale(0.3);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
          70% { 
            transform: scale(0.9);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }
      `,
      duration: '600ms',
      easing: tokens.transitions.easing.emphasized,
      iterationCount: 1,
      usage: 'Apply to error page content on load',
    },
  },

  // Toast/Notification Animations
  toast: {
    // Slide in from right
    slideIn: {
      name: 'toastSlideIn',
      keyframes: `
        @keyframes toastSlideIn {
          0% { 
            transform: translateX(100%);
            opacity: 0;
          }
          100% { 
            transform: translateX(0);
            opacity: 1;
          }
        }
      `,
      duration: '300ms',
      easing: tokens.transitions.easing.standard,
      iterationCount: 1,
      usage: 'Apply to error toasts when appearing',
    },

    // Slide out to right
    slideOut: {
      name: 'toastSlideOut',
      keyframes: `
        @keyframes toastSlideOut {
          0% { 
            transform: translateX(0);
            opacity: 1;
          }
          100% { 
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `,
      duration: '200ms',
      easing: tokens.transitions.easing.standard,
      iterationCount: 1,
      usage: 'Apply to error toasts when dismissing',
    },

    // Attention bounce
    attentionBounce: {
      name: 'toastAttentionBounce',
      keyframes: `
        @keyframes toastAttentionBounce {
          0%, 100% { 
            transform: translateX(0);
          }
          25% { 
            transform: translateX(-10px);
          }
          75% { 
            transform: translateX(10px);
          }
        }
      `,
      duration: '400ms',
      easing: 'ease-in-out',
      iterationCount: 1,
      delay: '2s',
      usage: 'Apply to persistent error toasts for attention',
    },
  },

  // Loading State Error Animations
  loading: {
    // Error pulse for failed loading states
    errorPulse: {
      name: 'loadingErrorPulse',
      keyframes: `
        @keyframes loadingErrorPulse {
          0%, 100% { 
            background-color: ${tokens.colors.semantic.error[50]};
            border-color: ${tokens.colors.semantic.error[200]};
          }
          50% { 
            background-color: ${tokens.colors.semantic.error[100]};
            border-color: ${tokens.colors.semantic.error[300]};
          }
        }
      `,
      duration: '1.5s',
      easing: 'ease-in-out',
      iterationCount: 'infinite',
      usage: 'Apply to loading components that encounter errors',
    },

    // Spinner to error transition
    spinnerToError: {
      name: 'spinnerToError',
      keyframes: `
        @keyframes spinnerToError {
          0% { 
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
          50% { 
            transform: rotate(180deg) scale(0.8);
            opacity: 0.5;
          }
          100% { 
            transform: rotate(360deg) scale(1);
            opacity: 1;
          }
        }
      `,
      duration: '500ms',
      easing: 'ease-out',
      iterationCount: 1,
      usage: 'Transition from loading spinner to error icon',
    },
  },

  // Micro-interactions
  micro: {
    // Error icon wiggle on hover
    iconWiggle: {
      name: 'errorIconWiggle',
      keyframes: `
        @keyframes errorIconWiggle {
          0%, 100% { 
            transform: rotate(0deg);
          }
          25% { 
            transform: rotate(-5deg);
          }
          75% { 
            transform: rotate(5deg);
          }
        }
      `,
      duration: '300ms',
      easing: 'ease-in-out',
      iterationCount: 1,
      trigger: 'hover',
      usage: 'Apply to error icons on hover',
    },

    // Button shake on error action
    buttonShake: {
      name: 'errorButtonShake',
      keyframes: `
        @keyframes errorButtonShake {
          0%, 100% { 
            transform: translateX(0);
          }
          25% { 
            transform: translateX(-2px);
          }
          75% { 
            transform: translateX(2px);
          }
        }
      `,
      duration: '200ms',
      easing: 'ease-in-out',
      iterationCount: 2,
      usage: 'Apply to buttons when action fails',
    },

    // Ripple effect for error actions
    errorRipple: {
      name: 'errorRipple',
      keyframes: `
        @keyframes errorRipple {
          0% { 
            transform: scale(0);
            opacity: 1;
            background-color: ${tokens.colors.semantic.error[200]};
          }
          100% { 
            transform: scale(4);
            opacity: 0;
            background-color: ${tokens.colors.semantic.error[100]};
          }
        }
      `,
      duration: '600ms',
      easing: 'ease-out',
      iterationCount: 1,
      usage: 'Apply as ripple effect on error actions',
    },
  },

  // Status Indicators
  status: {
    // Blinking dot for live errors
    blink: {
      name: 'statusBlink',
      keyframes: `
        @keyframes statusBlink {
          0%, 50%, 100% { 
            opacity: 1;
          }
          25%, 75% { 
            opacity: 0.3;
          }
        }
      `,
      duration: '1.5s',
      easing: 'ease-in-out',
      iterationCount: 'infinite',
      usage: 'Apply to status indicators for live errors',
    },

    // Breathing effect for warning states
    breathe: {
      name: 'statusBreathe',
      keyframes: `
        @keyframes statusBreathe {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1);
          }
        }
      `,
      duration: '2s',
      easing: 'ease-in-out',
      iterationCount: 'infinite',
      usage: 'Apply to warning indicators',
    },
  },
};

// Animation type definition
interface AnimationConfig {
  name: string;
  keyframes: string;
  duration: string;
  easing: string;
  iterationCount: number | string;
  delay?: string;
  usage: string;
  trigger?: string;
}

// Animation utility functions
export const animationUtils = {
  // Combine multiple animations
  combine: (...animations: string[]) => animations.join(', '),

  // Create animation string
  create: (animation: AnimationConfig) =>
    `${animation.name} ${animation.duration} ${animation.easing} ${animation.delay || '0s'} ${animation.iterationCount}`,

  // Get CSS keyframes
  getKeyframes: (animation: AnimationConfig) => animation.keyframes,

  // Apply animation on condition
  conditional: (condition: boolean, animation: AnimationConfig) =>
    condition ? animationUtils.create(animation) : 'none',
};

// Pre-defined animation sequences
export const animationSequences = {
  // Form validation error sequence
  formValidationError: [
    errorAnimations.formField.shake,
    errorAnimations.formField.borderFlash,
    errorAnimations.formField.fadeIn,
  ],

  // Page load error sequence
  pageLoadError: [errorAnimations.page.bounceIn, errorAnimations.page.float],

  // Toast notification sequence
  toastError: [
    errorAnimations.toast.slideIn,
    errorAnimations.toast.attentionBounce,
    errorAnimations.toast.slideOut,
  ],
};

// Animation timing functions
export const animationTiming = {
  // Stagger animations for multiple elements
  stagger: (index: number, baseDelay: number = 50) => `${index * baseDelay}ms`,

  // Sequential animations
  sequence: (animations: AnimationConfig[]) => {
    let totalDuration = 0;
    return animations.map((anim) => ({
      ...anim,
      delay: `${totalDuration}ms`,
      totalDuration: (totalDuration += parseInt(anim.duration)),
    }));
  },

  // Parallel animations with different durations
  parallel: (animations: AnimationConfig[]) =>
    animations.map((anim) => ({ ...anim, delay: '0ms' })),
};
