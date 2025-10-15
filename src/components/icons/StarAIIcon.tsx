import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

/**
 * StarAI Icon Component
 *
 * Design Concept:
 * - Clean, minimalist design matching Material UI icon style
 * - Five-pointed star outline with AI circuit/chip elements inside
 * - Single color (currentColor) for consistency with MUI icons
 * - Optimized for standard icon sizes (24px default)
 *
 * Design Elements:
 * - Star outline: Classic 5-pointed star shape
 * - AI Circuit: Geometric circuit pattern suggesting artificial intelligence
 * - Center node: Represents the AI core/processor
 * - Connection lines: Circuit pathways connecting to star points
 *
 * @param props - Standard MUI SvgIcon props (fontSize, color, sx, etc.)
 */
export const StarAIIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {/* Star outline */}
      <path
        d="M12 2 L14.5 9 L22 9.5 L16.5 14.5 L18 22 L12 18 L6 22 L7.5 14.5 L2 9.5 L9.5 9 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* AI Circuit pattern inside star */}
      {/* Central processor node */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />

      {/* Circuit connections to star points */}
      {/* Top */}
      <line
        x1="12"
        y1="10"
        x2="12"
        y2="6"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="12" cy="6" r="0.8" fill="currentColor" />

      {/* Top-right */}
      <line
        x1="13.5"
        y1="10.5"
        x2="16"
        y2="8.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="16" cy="8.5" r="0.8" fill="currentColor" />

      {/* Bottom-right */}
      <line
        x1="13.5"
        y1="13.5"
        x2="15.5"
        y2="16"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="15.5" cy="16" r="0.8" fill="currentColor" />

      {/* Bottom-left */}
      <line
        x1="10.5"
        y1="13.5"
        x2="8.5"
        y2="16"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="8.5" cy="16" r="0.8" fill="currentColor" />

      {/* Top-left */}
      <line
        x1="10.5"
        y1="10.5"
        x2="8"
        y2="8.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="8" cy="8.5" r="0.8" fill="currentColor" />
    </SvgIcon>
  );
};

// Default export
export default StarAIIcon;
