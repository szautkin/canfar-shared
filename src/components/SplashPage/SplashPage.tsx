import React from 'react';
import { Box } from '@/components/Box/Box';
import { AppBar } from '@/components/AppBar/AppBar';
import { HeroSection } from '@/components/HeroSection/HeroSection';
import { ServicesGrid } from '@/components/ServicesGrid/ServicesGrid';
import { Footer } from '@/components/Footer/Footer';
import { Container } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import GroupIcon from '@mui/icons-material/Group';
import LinkIcon from '@mui/icons-material/Link';
import PowerIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import ScienceIcon from '@mui/icons-material/Widgets';
import GitHubIcon from '@mui/icons-material/GitHub';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StarAIIcon from '@/components/icons/StarAIIcon';
import { SocialLinkProps } from '@/components/SocialLink/SocialLink';
import { ServiceCardProps } from '@/components/ServiceCard/ServiceCard';
import { FooterSection } from '@/components/Footer/Footer';
import { CanfarLogo, NavigationItem } from '@/stories/shared/navigation';

// Import Discord icon from MUI icons extended or use a custom icon
const DiscordIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export interface SplashPageProps {
  navigation?: {
    logo?: React.ReactNode;
    links?: NavigationItem[];
    menuLabel?: string;
    menuItems?: NavigationItem[];
  };
}

export const SplashPage: React.FC<SplashPageProps> = ({ navigation }) => {
  const services: ServiceCardProps[] = [
    {
      href: '/science-portal',
      icon: <ScienceIcon />,
      title: 'Science Portal',
      tooltip: 'Science Portal sessions',
    },
    {
      href: '/star-ai',
      icon: <StarAIIcon fontSize="large" />,
      title: 'StarAI',
      tooltip: 'AI assistant for CADC data queries and CANFAR platform',
    },
    {
      href: '/storage',
      icon: <StorageIcon />,
      title: 'Storage Management',
      tooltip: 'Manage your VOSpace',
    },
    {
      href: '/groups',
      icon: <GroupIcon />,
      title: 'Group Management',
      tooltip: 'Manage your CADC groups',
    },
    {
      href: '/meetings',
      icon: <EventNoteIcon />,
      title: 'Meetings',
      tooltip:
        'Discover and register for astronomical research meetings and conferences',
    },
    {
      href: '/citation',
      icon: <LinkIcon />,
      title: 'Data Publication',
      tooltip: 'Publish your data using VOSpace and Digital Object Identifiers',
    },
    {
      href: 'https://arbutus-canfar.cloud.computecanada.ca',
      icon: <PowerIcon />,
      title: 'OpenStack Cloud',
      tooltip: 'Interactive Virtual Machines',
      target: '_blank',
      rel: 'external',
    },
    {
      href: 'https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/search/',
      icon: <SearchIcon />,
      title: 'CADC Search',
      tooltip: 'Search data collections at the Canadian Astronomy Data Centre',
      target: '_blank',
    },
  ];

  const socialLinks: SocialLinkProps[] = [
    {
      href: 'https://github.com/opencadc',
      icon: <GitHubIcon />,
      tooltip: 'See the OpenCADC GitHub page',
      ariaLabel: 'GitHub',
    },
    {
      href: 'https://discord.gg/vcCQ8QBvBa',
      icon: <DiscordIcon />,
      tooltip: 'Join the CANFAR Discord',
      ariaLabel: 'Discord',
    },
  ];

  const footerSections: FooterSection[] = [
    {
      title: 'Download',
      links: [
        {
          label: 'Python applications',
          href: 'https://pypi.org/search/?q=caom2%7Ccadc',
          external: true,
        },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'CANFAR', href: '/about/organization' },
        { label: 'Terms', href: '/about/terms-of-reference' },
      ],
    },
    {
      title: 'Acknowledgements',
      links: [
        {
          label: 'Canadian Space Agency',
          href: 'https://www.asc-csa.gc.ca/eng/',
          external: true,
        },
        {
          label: 'National Research Council Canada',
          href: 'https://nrc.canada.ca/en/',
          external: true,
        },
        {
          label: 'Canarie',
          href: 'https://www.canarie.ca/',
          external: true,
        },
        {
          label: 'Digital Research Alliance Canada',
          href: 'https://alliancecan.ca/',
          external: true,
        },
      ],
    },
  ];

  const defaultNavigation = {
    logo: <CanfarLogo />,
    links: [
      {
        label: 'Documentation',
        href: '/docs/overview/',
        type: 'link' as const,
      },
      { label: 'About', href: '/about', type: 'link' as const },
      { label: 'Open Source', href: '/open-source', type: 'link' as const },
    ],
    ...navigation,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <AppBar {...defaultNavigation} />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <HeroSection
            title="Canadian Advanced Network for Astronomical Research"
            primaryAction={{
              label: 'Check what CANFAR offers',
              href: '/docs/overview/',
              variant: 'secondary',
            }}
          />

          <Box sx={{ py: { xs: 4, md: 8 } }}>
            <ServicesGrid services={services} />
          </Box>
        </Container>
      </Box>

      <Footer
        sections={footerSections}
        socialLinks={socialLinks}
        copyright="© 2022-2026"
      />
    </Box>
  );
};
