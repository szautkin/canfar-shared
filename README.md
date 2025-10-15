# CANFAR Shared Components

A comprehensive React component library built with Material UI and TypeScript for the CANFAR (Canadian Advanced Network for Astronomical Research) platform.

## Features

- **108+ Production-Ready Components**: UI components, forms, dialogs, tables, and domain-specific components
- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Material UI Based**: Built on top of Material UI v7 with custom theming
- **Design System**: Complete design tokens including colors, typography, spacing, and more
- **Accessibility**: WCAG AA compliant with built-in a11y support
- **Tree-Shakeable**: Optimized bundle size with ES modules
- **Dark Mode**: Full light/dark theme support

## Installation

```bash
npm install @canfar/shared-components
```

### Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled @mui/icons-material
```

Optional dependencies:
```bash
npm install @mui/x-data-grid  # For data grid components
```

## Quick Start

### 1. Wrap your app with the theme provider

```tsx
import { ThemeProvider, createCanfarTheme } from '@canfar/shared-components';

function App() {
  const theme = createCanfarTheme('light');

  return (
    <ThemeProvider theme={theme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### 2. Import and use components

```tsx
import { Button, Card, TextField } from '@canfar/shared-components';

function MyComponent() {
  return (
    <Card>
      <TextField label="Username" />
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </Card>
  );
}
```

## Component Categories

### UI Components
Basic building blocks for your interface:
- `Button`, `IconButton`
- `TextField`, `Checkbox`, `Radio`, `Switch`, `Select`, `Slider`
- `Card`, `Paper`, `Box`, `Grid`
- `Typography`, `Divider`, `Avatar`, `Badge`, `Chip`
- `Alert`, `Snackbar`, `Tooltip`, `Progress`, `Skeleton`

### Layout Components
Structure your application:
- `AppLayout`, `PageLayout`
- `AppBar`, `Toolbar`, `Drawer`
- `Header`, `Footer`
- `WidgetContainer`, `CollapsiblePanel`

### Dialog Components
Modal and dialog interfaces:
- `Dialog`, `DeleteConfirmationDialog`
- `LoginModal`, `SessionCheckModal`
- `AddGroupDialog`, `EditGroupDialog`
- `CreateFolderDialog`, `UploadDialog`
- And many more...

### Data Display Components
Tables and data visualization:
- `Table`, `TableBody`, `TableHead`, `TableRow`, `TableCell`
- `FileTable`, `MeetingTable`, `GroupTable`, `DOITable`
- `List`, `Menu`, `MenuItem`
- `BarChartHorizontal`, `PlatformLoad`

### Domain-Specific Components
CANFAR-specific functionality:
- **Meetings**: `MeetingCard`, `MeetingForm`, `MeetingsList`, `MeetingDetail`
- **Sessions**: `SessionCard`, `SessionLaunchForm`, `ActiveSessionsWidget`
- **Storage**: `UserStorageWidget`, `FileTable`
- **Services**: `ServiceCard`, `ServicesGrid`
- **AI**: `AIPromptInterface`, `ResponseViewer`, `ModelSelector`
- **Metrics**: `MetricBlock`, `PlatformLoad`

## Usage Examples

### Using the Design System

```tsx
import { designTokens } from '@canfar/shared-components';

const MyStyledComponent = styled('div')({
  color: designTokens.colors.primary.main,
  padding: designTokens.spacing.medium,
  borderRadius: designTokens.spacing.borderRadius,
  boxShadow: designTokens.shadows.card,
});
```

### Custom Theme

```tsx
import { createCanfarTheme } from '@canfar/shared-components';

const customTheme = createCanfarTheme('dark', {
  primary: {
    main: '#custom-color',
  },
});
```

### Using Hooks

```tsx
import { useSnackbarQueue } from '@canfar/shared-components';

function MyComponent() {
  const { enqueueSnackbar } = useSnackbarQueue();

  const handleClick = () => {
    enqueueSnackbar({
      message: 'Operation successful!',
      severity: 'success',
    });
  };

  return <Button onClick={handleClick}>Show Notification</Button>;
}
```

### Resource Selectors

```tsx
import {
  ResourceSliderInput,
  ResourceStepperInput,
  DualResourceSelector
} from '@canfar/shared-components';

function ResourceConfiguration() {
  const [cpu, setCpu] = useState(2);
  const [memory, setMemory] = useState(4);

  return (
    <div>
      <ResourceSliderInput
        label="CPU Cores"
        value={cpu}
        onChange={setCpu}
        min={1}
        max={16}
      />
      <DualResourceSelector
        cpuValue={cpu}
        memoryValue={memory}
        onCpuChange={setCpu}
        onMemoryChange={setMemory}
      />
    </div>
  );
}
```

## TypeScript Support

All components come with comprehensive TypeScript definitions:

```tsx
import type { ButtonProps, CardProps } from '@canfar/shared-components';

const MyButton: React.FC<ButtonProps> = (props) => {
  // TypeScript will provide full autocomplete and type checking
  return <Button {...props} />;
};
```

## Design Tokens

Access the complete design system:

```tsx
import { designTokens } from '@canfar/shared-components';

// Colors
designTokens.colors.primary.main     // #1976d2
designTokens.colors.secondary.main   // #c2185b
designTokens.colors.tertiary.main    // #8e24aa

// Typography
designTokens.typography.fontFamily
designTokens.typography.fontSizes

// Spacing
designTokens.spacing.small    // 8px
designTokens.spacing.medium   // 16px
designTokens.spacing.large    // 24px

// Shadows
designTokens.shadows.card
designTokens.shadows.dialog

// Transitions
designTokens.transitions.standard
```

## Building from Source

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run in development mode (watch)
npm run dev

# Type check
npm run typecheck
```

## Project Structure

```
canfar-shared/
├── src/
│   ├── components/       # 108+ React components
│   ├── implementation/   # Component implementations
│   ├── types/           # TypeScript type definitions
│   ├── design-system/   # Design tokens and styles
│   ├── theme/           # Material UI theme configuration
│   ├── hooks/           # Custom React hooks
│   └── index.ts         # Main export file
├── dist/                # Built output (generated)
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

This library is part of the CANFAR platform. For contributions, please refer to the main CANFAR project guidelines.

## Related Projects

- [canfar-next](https://github.com/szautkin/canfar-next) - Main CANFAR Next.js application
- CANFAR Science Platform - https://www.canfar.net/

## Support

For issues and questions:
- GitHub Issues: https://github.com/szautkin/canfar-shared/issues
- CANFAR Website: https://www.canfar.net/
