import React from 'react';
import { Box } from '@/components/Box/Box';
import { Typography } from '@/components/Typography/Typography';
import { Button } from '@/components/Button/Button';
import { Container } from '@mui/material';

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  primaryAction?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'ghost';
  };
  secondaryAction?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'ghost';
  };
  align?: 'left' | 'center' | 'right';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  align = 'left',
}) => {
  return (
    <Box
      sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 4, md: 6 },
        textAlign: align,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 300,
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: 'primary',
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="h5"
            color="secondary"
            paragraph
            sx={{
              mb: 4,
              fontWeight: 300,
            }}
          >
            {subtitle}
          </Typography>
        )}

        {(primaryAction || secondaryAction) && (
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: align,
              flexWrap: 'wrap',
              mt: 4,
            }}
          >
            {primaryAction && (
              <Button
                variant={primaryAction.variant || 'primary'}
                href={primaryAction.href}
                size="lg"
                component="a"
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant={secondaryAction.variant || 'secondary'}
                href={secondaryAction.href}
                size="lg"
                component="a"
              >
                {secondaryAction.label}
              </Button>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};
