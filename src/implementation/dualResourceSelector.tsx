'use client';

import {
  Box,
  Paper,
  Stack,
  Typography,
  Chip,
  Alert,
  Divider,
} from '@mui/material';
import { Memory, DeveloperBoard } from '@mui/icons-material';
import { DualResourceSelectorProps } from '@/types/DualResourceSelectorProps';
import { ResourceSliderInputImpl } from './resourceSliderInput';
import { ResourceStepperInputImpl } from './resourceStepperInput';
import { tokens } from '@/design-system/tokens';
import React, { useCallback, useMemo } from 'react';

const RECOMMENDED_RATIOS = [
  { cores: 1, memory: 4, label: 'Light workload' },
  { cores: 1, memory: 8, label: 'Standard workload' },
  { cores: 1, memory: 16, label: 'Memory-intensive' },
];

export const DualResourceSelectorImpl = React.forwardRef<
  HTMLDivElement,
  DualResourceSelectorProps
>((props, ref) => {
  const {
    value,
    onChange,
    coresMin = 1,
    coresMax = 192,
    coresStep = 1,
    memoryMin = 1,
    memoryMax = 192,
    memoryStep = 1,
    disabled = false,
    variant = 'slider',
    size = 'md',
    showRecommendations = true,
  } = props;

  const handleCoresChange = useCallback(
    (newCores: number) => {
      onChange({ ...value, cores: newCores });
    },
    [value, onChange]
  );

  const handleMemoryChange = useCallback(
    (newMemory: number) => {
      onChange({ ...value, memory: newMemory });
    },
    [value, onChange]
  );

  const currentRatio = useMemo(() => {
    if (value.cores === 0) return 0;
    return value.memory / value.cores;
  }, [value.cores, value.memory]);

  const ratioRecommendation = useMemo(() => {
    if (currentRatio < 3) {
      return {
        severity: 'warning' as const,
        message:
          'Low memory ratio for selected cores. Consider increasing memory.',
      };
    }
    if (currentRatio > 20) {
      return {
        severity: 'info' as const,
        message:
          'High memory ratio. You may want to reduce memory to optimize costs.',
      };
    }
    return null;
  }, [currentRatio]);

  const handlePresetClick = useCallback(
    (preset: { cores: number; memory: number }) => {
      onChange(preset);
    },
    [onChange]
  );

  const InputComponent =
    variant === 'slider' ? ResourceSliderInputImpl : ResourceStepperInputImpl;

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={{
        p: 3,
        border: 1,
        borderColor: 'divider',
        borderRadius: tokens.borderRadius.lg,
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: tokens.typography.fontSize.lg,
              fontWeight: tokens.typography.fontWeight.semibold,
              mb: 1,
            }}
          >
            Resource Configuration
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: tokens.typography.fontSize.sm }}
          >
            Configure compute resources for your workload
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={3}>
          <InputComponent
            label="CPU Cores"
            value={value.cores}
            onChange={handleCoresChange}
            min={coresMin}
            max={coresMax}
            step={coresStep}
            unit="cores"
            disabled={disabled}
            size={size}
            aria-label="CPU cores selector"
          />

          <InputComponent
            label="Memory"
            value={value.memory}
            onChange={handleMemoryChange}
            min={memoryMin}
            max={memoryMax}
            step={memoryStep}
            unit="GB"
            disabled={disabled}
            size={size}
            aria-label="Memory selector"
          />
        </Stack>

        {showRecommendations && (
          <>
            <Divider />
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: tokens.typography.fontSize.sm,
                  fontWeight: tokens.typography.fontWeight.medium,
                  mb: 1.5,
                }}
              >
                Quick Presets
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {RECOMMENDED_RATIOS.map((preset) => (
                  <Chip
                    key={`${preset.cores}-${preset.memory}`}
                    label={`${preset.cores} cores / ${preset.memory} GB - ${preset.label}`}
                    onClick={() =>
                      handlePresetClick({
                        cores: preset.cores,
                        memory: preset.memory,
                      })
                    }
                    disabled={disabled}
                    icon={preset.memory > 8 ? <Memory /> : <DeveloperBoard />}
                    color={
                      value.cores === preset.cores &&
                      value.memory === preset.memory
                        ? 'primary'
                        : 'default'
                    }
                    variant={
                      value.cores === preset.cores &&
                      value.memory === preset.memory
                        ? 'filled'
                        : 'outlined'
                    }
                    clickable
                    sx={{
                      fontSize: tokens.typography.fontSize.sm,
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </>
        )}

        {ratioRecommendation && (
          <Alert
            severity={ratioRecommendation.severity}
            sx={{ fontSize: tokens.typography.fontSize.sm }}
          >
            {ratioRecommendation.message}
          </Alert>
        )}

        <Box
          sx={{
            p: 2,
            bgcolor: 'action.hover',
            borderRadius: tokens.borderRadius.md,
          }}
        >
          <Stack direction="row" spacing={3} justifyContent="space-between">
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: tokens.typography.fontSize.xs }}
              >
                Total Resources
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: tokens.typography.fontSize.base,
                  fontWeight: tokens.typography.fontWeight.semibold,
                }}
              >
                {value.cores} cores / {value.memory} GB
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: tokens.typography.fontSize.xs }}
              >
                Memory/Core Ratio
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: tokens.typography.fontSize.base,
                  fontWeight: tokens.typography.fontWeight.semibold,
                }}
              >
                {currentRatio.toFixed(1)} GB/core
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
});

DualResourceSelectorImpl.displayName = 'DualResourceSelectorImpl';
