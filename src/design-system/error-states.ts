// Error State Design System
// This file defines the comprehensive error state patterns for the CANFAR application

import { tokens } from './tokens';

export const errorStates = {
  // Form Field Error States
  formField: {
    // Visual properties for error states
    visual: {
      borderColor: tokens.colors.semantic.error[500],
      borderWidth: '2px',
      backgroundColor: tokens.colors.semantic.error[50],
      iconColor: tokens.colors.semantic.error[500],
      textColor: tokens.colors.semantic.error[700],
      helperTextColor: tokens.colors.semantic.error[600],
      focusShadow: `0 0 0 3px ${tokens.colors.semantic.error[200]}`,
    },

    // Animations
    animation: {
      shake: {
        keyframes: `
          @keyframes errorShake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
            20%, 40%, 60%, 80% { transform: translateX(4px); }
          }
        `,
        duration: '500ms',
        easing: 'ease-in-out',
      },
      fadeIn: {
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
      },
    },

    // Icon specifications
    icon: {
      size: {
        sm: '16px',
        md: '20px',
        lg: '24px',
      },
      position: 'right',
      spacing: tokens.spacing[2],
    },

    // Helper text specifications
    helperText: {
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      lineHeight: tokens.typography.lineHeight.tight,
      marginTop: tokens.spacing[1],
      maxWidth: '100%',
      icon: {
        size: '14px',
        marginRight: tokens.spacing[1],
      },
    },
  },

  // Error Boundary UI
  errorBoundary: {
    container: {
      minHeight: '400px',
      padding: tokens.spacing[8],
      backgroundColor: tokens.colors.surface.background.default,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    card: {
      maxWidth: '600px',
      padding: tokens.spacing[6],
      borderRadius: tokens.borderRadius.lg,
      boxShadow: tokens.shadows.elevation[4],
      backgroundColor: tokens.colors.surface.background.paper,
      textAlign: 'center',
    },

    icon: {
      size: '80px',
      color: tokens.colors.semantic.error[400],
      marginBottom: tokens.spacing[4],
      animation: {
        pulse: {
          keyframes: `
            @keyframes errorPulse {
              0% { 
                transform: scale(1);
                opacity: 1;
              }
              50% { 
                transform: scale(1.05);
                opacity: 0.8;
              }
              100% { 
                transform: scale(1);
                opacity: 1;
              }
            }
          `,
          duration: '2s',
          easing: 'ease-in-out',
          iterationCount: 'infinite',
        },
      },
    },

    title: {
      fontSize: tokens.typography.fontSize['3xl'],
      fontWeight: tokens.typography.fontWeight.semibold,
      color: tokens.colors.neutral[900],
      marginBottom: tokens.spacing[2],
    },

    message: {
      fontSize: tokens.typography.fontSize.lg,
      color: tokens.colors.text.secondary.light,
      lineHeight: tokens.typography.lineHeight.relaxed,
      marginBottom: tokens.spacing[4],
    },

    button: {
      marginTop: tokens.spacing[4],
      minWidth: '160px',
    },

    details: {
      marginTop: tokens.spacing[6],
      padding: tokens.spacing[4],
      backgroundColor: tokens.colors.semantic.error[50],
      borderRadius: tokens.borderRadius.md,
      border: `1px solid ${tokens.colors.semantic.error[200]}`,
      textAlign: 'left',
    },
  },

  // 404 Page Design
  notFound: {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.colors.surface.background.default,
      padding: tokens.spacing[4],
    },

    content: {
      maxWidth: '800px',
      textAlign: 'center',
    },

    illustration: {
      width: '100%',
      maxWidth: '400px',
      height: 'auto',
      marginBottom: tokens.spacing[8],
      animation: {
        float: {
          keyframes: `
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
          `,
          duration: '3s',
          easing: 'ease-in-out',
          iterationCount: 'infinite',
        },
      },
    },

    code: {
      fontSize: tokens.typography.fontSize['8xl'],
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.primary[500],
      lineHeight: '1',
      marginBottom: tokens.spacing[2],
      letterSpacing: tokens.typography.letterSpacing.tight,
    },

    title: {
      fontSize: tokens.typography.fontSize['4xl'],
      fontWeight: tokens.typography.fontWeight.semibold,
      color: tokens.colors.neutral[900],
      marginBottom: tokens.spacing[3],
    },

    message: {
      fontSize: tokens.typography.fontSize.xl,
      color: tokens.colors.text.secondary.light,
      marginBottom: tokens.spacing[8],
      maxWidth: '600px',
      margin: '0 auto',
    },

    actions: {
      display: 'flex',
      gap: tokens.spacing[3],
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  },

  // 500 Server Error Design
  serverError: {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.colors.surface.background.default,
      padding: tokens.spacing[4],
    },

    content: {
      maxWidth: '800px',
      textAlign: 'center',
    },

    illustration: {
      width: '100%',
      maxWidth: '350px',
      height: 'auto',
      marginBottom: tokens.spacing[8],
      animation: {
        glitch: {
          keyframes: `
            @keyframes glitch {
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
        },
      },
    },

    code: {
      fontSize: tokens.typography.fontSize['8xl'],
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.semantic.error[500],
      lineHeight: '1',
      marginBottom: tokens.spacing[2],
    },

    title: {
      fontSize: tokens.typography.fontSize['4xl'],
      fontWeight: tokens.typography.fontWeight.semibold,
      color: tokens.colors.neutral[900],
      marginBottom: tokens.spacing[3],
    },

    message: {
      fontSize: tokens.typography.fontSize.xl,
      color: tokens.colors.text.secondary.light,
      marginBottom: tokens.spacing[6],
      maxWidth: '600px',
      margin: '0 auto',
    },

    statusInfo: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: tokens.spacing[2],
      padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
      backgroundColor: tokens.colors.semantic.error[50],
      borderRadius: tokens.borderRadius.full,
      marginBottom: tokens.spacing[6],
      animation: {
        blink: {
          keyframes: `
            @keyframes blink {
              0%, 50%, 100% { opacity: 1; }
              25%, 75% { opacity: 0.5; }
            }
          `,
          duration: '1.5s',
          easing: 'ease-in-out',
          iterationCount: 'infinite',
        },
      },
    },
  },

  // Inline Error Messages
  inlineError: {
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: tokens.spacing[2],
      padding: tokens.spacing[3],
      backgroundColor: tokens.colors.semantic.error[50],
      border: `1px solid ${tokens.colors.semantic.error[200]}`,
      borderRadius: tokens.borderRadius.md,
      marginTop: tokens.spacing[2],
      animation: {
        slideDown: {
          keyframes: `
            @keyframes slideDown {
              0% { 
                opacity: 0;
                transform: translateY(-8px);
                max-height: 0;
              }
              100% { 
                opacity: 1;
                transform: translateY(0);
                max-height: 200px;
              }
            }
          `,
          duration: '300ms',
          easing: tokens.transitions.easing.standard,
        },
      },
    },

    icon: {
      size: '20px',
      color: tokens.colors.semantic.error[600],
      flexShrink: 0,
    },

    text: {
      fontSize: tokens.typography.fontSize.sm,
      color: tokens.colors.semantic.error[700],
      lineHeight: tokens.typography.lineHeight.relaxed,
    },
  },

  // Toast/Snackbar Error
  toast: {
    container: {
      minWidth: '300px',
      maxWidth: '500px',
      padding: tokens.spacing[4],
      backgroundColor: tokens.colors.semantic.error[600],
      color: tokens.colors.text.onError,
      borderRadius: tokens.borderRadius.md,
      boxShadow: tokens.shadows.elevation[8],
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing[3],
      animation: {
        slideIn: {
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
        },
        slideOut: {
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
        },
      },
    },

    icon: {
      size: '24px',
      color: tokens.colors.text.onError,
    },

    message: {
      fontSize: tokens.typography.fontSize.base,
      fontWeight: tokens.typography.fontWeight.medium,
      flex: 1,
    },

    action: {
      color: tokens.colors.text.onError,
      fontWeight: tokens.typography.fontWeight.semibold,
      textTransform: 'uppercase',
      fontSize: tokens.typography.fontSize.sm,
      letterSpacing: tokens.typography.letterSpacing.wide,
    },
  },

  // Empty State with Error
  emptyStateError: {
    container: {
      padding: tokens.spacing[8],
      textAlign: 'center',
      maxWidth: '400px',
      margin: '0 auto',
    },

    icon: {
      size: '64px',
      color: tokens.colors.neutral[400],
      marginBottom: tokens.spacing[4],
    },

    title: {
      fontSize: tokens.typography.fontSize['2xl'],
      fontWeight: tokens.typography.fontWeight.semibold,
      color: tokens.colors.neutral[900],
      marginBottom: tokens.spacing[2],
    },

    message: {
      fontSize: tokens.typography.fontSize.base,
      color: tokens.colors.text.secondary.light,
      marginBottom: tokens.spacing[4],
    },

    action: {
      marginTop: tokens.spacing[4],
    },
  },
} as const;

// Error State Patterns and Guidelines
export const errorPatterns = {
  // Form validation patterns
  validation: {
    // Real-time validation timing
    timing: {
      onBlur: true,
      onChange: false, // Only after first blur
      debounceMs: 300,
    },

    // Error message guidelines
    messages: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      password: {
        minLength: 'Password must be at least 8 characters',
        uppercase: 'Password must contain at least one uppercase letter',
        lowercase: 'Password must contain at least one lowercase letter',
        number: 'Password must contain at least one number',
        special: 'Password must contain at least one special character',
      },
      pattern: 'Please match the requested format',
      minLength: 'Please enter at least {min} characters',
      maxLength: 'Please enter no more than {max} characters',
      min: 'Value must be at least {min}',
      max: 'Value must be no more than {max}',
    },
  },

  // Error recovery patterns
  recovery: {
    // Retry strategies
    retry: {
      maxAttempts: 3,
      backoffMs: [1000, 2000, 4000],
      showRetryAfterMs: 2000,
    },

    // Auto-save patterns
    autoSave: {
      enabled: true,
      intervalMs: 30000,
      onError: 'queue',
    },
  },

  // Accessibility patterns
  accessibility: {
    // ARIA attributes
    aria: {
      invalid: true,
      describedby: 'error-message-id',
      live: 'polite',
      atomic: true,
    },

    // Focus management
    focus: {
      onError: true,
      trapFocus: false,
      returnFocus: true,
    },

    // Screen reader announcements
    announcements: {
      onValidation: 'Error: {message}',
      onSubmit: '{count} errors found. Please review and correct.',
      onClear: 'Error cleared',
    },
  },
} as const;
