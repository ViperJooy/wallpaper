import { createTheme } from '@mui/material/styles';

// ChatBubble Design System Tokens
const CHATBUBBLE = {
  background: '#FFFFFF',
  surface: '#F3F4F6',
  surfaceHover: '#E5E7EB',
  primary: '#22C55E',
  primaryHover: '#16A34A',
  secondary: '#3B82F6',
  tertiary: '#A855F7',
  textPrimary: '#000000',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
};

const common = {
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.015em',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body1: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.01em',
      textTransform: 'none',
    },
    caption: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 400,
    },
    overline: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
      fontSize: '0.75rem',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9375rem',
          padding: '10px 24px',
          minHeight: 44,
          transition: 'all 150ms ease',
        },
        contained: {
          backgroundColor: CHATBUBBLE.primary,
          color: '#FFFFFF',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: CHATBUBBLE.primaryHover,
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: CHATBUBBLE.border,
          color: CHATBUBBLE.textPrimary,
          '&:hover': {
            borderColor: CHATBUBBLE.textSecondary,
            backgroundColor: CHATBUBBLE.surface,
          },
        },
        text: {
          color: CHATBUBBLE.textSecondary,
          '&:hover': {
            color: CHATBUBBLE.textPrimary,
            backgroundColor: CHATBUBBLE.surface,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: '0.875rem',
          backgroundColor: CHATBUBBLE.surface,
          color: CHATBUBBLE.textPrimary,
          border: 'none',
          minHeight: 36,
          '&.MuiChip-outlined': {
            borderColor: CHATBUBBLE.border,
          },
        },
        colorPrimary: {
          backgroundColor: CHATBUBBLE.primary,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: CHATBUBBLE.primaryHover,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '0.9375rem',
          minHeight: 48,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          backgroundColor: CHATBUBBLE.background,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: CHATBUBBLE.surface,
            '& fieldset': { border: 'none' },
            '&:hover': {
              backgroundColor: CHATBUBBLE.surfaceHover,
            },
            '&.Mui-focused': {
              backgroundColor: CHATBUBBLE.background,
              boxShadow: `0 0 0 2px ${CHATBUBBLE.primary}40`,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: CHATBUBBLE.background,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: CHATBUBBLE.background,
          borderRadius: 16,
          border: `1px solid ${CHATBUBBLE.border}`,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"DM Sans", sans-serif',
          borderRadius: 8,
          margin: '2px 8px',
          '&:hover': {
            backgroundColor: CHATBUBBLE.surface,
          },
          '&.Mui-selected': {
            backgroundColor: CHATBUBBLE.surface,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: '"DM Sans", sans-serif',
          backgroundColor: '#1F2937',
          color: '#F9FAFB',
          borderRadius: 8,
          fontSize: '0.8125rem',
          padding: '6px 12px',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: CHATBUBBLE.primary,
        },
      },
    },
  },
};

// Light mode themes (ChatBubble default)
const lightPalette = {
  forest: {
    primary: { main: '#22C55E', light: '#4ADE80', dark: '#16A34A' },
    secondary: { main: '#3B82F6' },
  },
  default: {
    primary: { main: '#3B82F6', light: '#60A5FA', dark: '#2563EB' },
    secondary: { main: '#22C55E' },
  },
  sunset: {
    primary: { main: '#F97316', light: '#FB923C', dark: '#EA580C' },
    secondary: { main: '#3B82F6' },
  },
  ocean: {
    primary: { main: '#06B6D4', light: '#22D3EE', dark: '#0891B2' },
    secondary: { main: '#3B82F6' },
  },
  lavender: {
    primary: { main: '#A855F7', light: '#C084FC', dark: '#9333EA' },
    secondary: { main: '#3B82F6' },
  },
  cherry: {
    primary: { main: '#EF4444', light: '#F87171', dark: '#DC2626' },
    secondary: { main: '#3B82F6' },
  },
};

// Dark mode themes (secondary — less contrast)
const darkPalette = {
  forest: {
    primary: { main: '#4ADE80', light: '#86EFAC', dark: '#22C55E' },
    secondary: { main: '#60A5FA' },
  },
  default: {
    primary: { main: '#60A5FA', light: '#93C5FD', dark: '#3B82F6' },
    secondary: { main: '#4ADE80' },
  },
  sunset: {
    primary: { main: '#FB923C', light: '#FDBA74', dark: '#F97316' },
    secondary: { main: '#60A5FA' },
  },
  ocean: {
    primary: { main: '#22D3EE', light: '#67E8F9', dark: '#06B6D4' },
    secondary: { main: '#60A5FA' },
  },
  lavender: {
    primary: { main: '#C084FC', light: '#D8B4FE', dark: '#A855F7' },
    secondary: { main: '#60A5FA' },
  },
  cherry: {
    primary: { main: '#F87171', light: '#FCA5A5', dark: '#EF4444' },
    secondary: { main: '#60A5FA' },
  },
};

const darkBg = {
  default: '#111827',
  paper: '#1F2937',
};

const lightBg = {
  default: CHATBUBBLE.background,
  paper: CHATBUBBLE.surface,
};

// Dark mode component overrides
const darkComponents = {
  MuiButton: {
    styleOverrides: {
      outlined: {
        borderColor: '#374151',
        color: '#F9FAFB',
        '&:hover': {
          borderColor: '#9CA3AF',
          backgroundColor: '#374151',
        },
      },
      text: {
        color: '#9CA3AF',
        '&:hover': {
          color: '#F9FAFB',
          backgroundColor: '#374151',
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: '#374151',
        color: '#F9FAFB',
        '&.MuiChip-outlined': {
          borderColor: '#374151',
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: '#1F2937',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#374151',
          '&:hover': {
            backgroundColor: '#4B5563',
          },
          '&.Mui-focused': {
            backgroundColor: '#1F2937',
          },
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: '#111827',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: '#1F2937',
        border: '1px solid #374151',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: '#374151',
        },
        '&.Mui-selected': {
          backgroundColor: '#374151',
        },
      },
    },
  },
};

export const themes = {};
for (const name of Object.keys(lightPalette)) {
  // Light themes (default — ChatBubble is light-first)
  themes[name] = createTheme({
    ...common,
    palette: {
      mode: 'light',
      primary: lightPalette[name].primary,
      secondary: lightPalette[name].secondary,
      background: lightBg,
      text: {
        primary: CHATBUBBLE.textPrimary,
        secondary: CHATBUBBLE.textSecondary,
      },
      divider: CHATBUBBLE.border,
      error: { main: CHATBUBBLE.error },
      warning: { main: CHATBUBBLE.warning },
      success: { main: CHATBUBBLE.success },
    },
  });

  // Dark themes (secondary)
  themes[`${name}Dark`] = createTheme({
    ...common,
    components: {
      ...common.components,
      ...darkComponents,
    },
    palette: {
      mode: 'dark',
      primary: darkPalette[name].primary,
      secondary: darkPalette[name].secondary,
      background: darkBg,
      text: {
        primary: '#F9FAFB',
        secondary: '#9CA3AF',
      },
      divider: '#374151',
      error: { main: CHATBUBBLE.error },
      warning: { main: CHATBUBBLE.warning },
      success: { main: CHATBUBBLE.success },
    },
  });
}

export const themeNames = {
  forest: '森林绿',
  default: '天空蓝',
  sunset: '日落橙',
  ocean: '海洋青',
  lavender: '薰衣草紫',
  cherry: '樱花粉',
};

export const themeColors = {
  forest: '#22C55E',
  default: '#3B82F6',
  sunset: '#F97316',
  ocean: '#06B6D4',
  lavender: '#A855F7',
  cherry: '#EF4444',
};

export const defaultTheme = themes.forest;
