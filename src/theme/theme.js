import { createTheme } from '@mui/material/styles';

const common = {
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: [
      '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
      '"Helvetica Neue"', 'Arial', 'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 12 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': { borderRadius: 12 },
        },
      },
    },
  },
};

const darkOverrides = {
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
};

const lightPalette = {
  forest: {
    primary: { main: '#2e7d32', light: '#66bb6a', dark: '#1b5e20' },
    secondary: { main: '#558b2f' },
    background: { default: '#e8f5e9', paper: '#ffffff' },
  },
  default: {
    primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0' },
    secondary: { main: '#dc004e' },
    background: { default: '#fafafa', paper: '#ffffff' },
  },
  sunset: {
    primary: { main: '#e65100', light: '#ff8a50', dark: '#bf360c' },
    secondary: { main: '#ff6f00' },
    background: { default: '#fff3e0', paper: '#ffffff' },
  },
  ocean: {
    primary: { main: '#00695c', light: '#4db6ac', dark: '#004d40' },
    secondary: { main: '#00838f' },
    background: { default: '#e0f7fa', paper: '#ffffff' },
  },
  lavender: {
    primary: { main: '#6a1b9a', light: '#ab47bc', dark: '#4a148c' },
    secondary: { main: '#8e24aa' },
    background: { default: '#f3e5f5', paper: '#ffffff' },
  },
  cherry: {
    primary: { main: '#c62828', light: '#ef5350', dark: '#b71c1c' },
    secondary: { main: '#f06292' },
    background: { default: '#fce4ec', paper: '#ffffff' },
  },
};

const darkPalette = {
  forest: {
    primary: { main: '#4caf50', light: '#81c784', dark: '#2e7d32' },
    secondary: { main: '#7cb342' },
    background: { default: '#0a1f0a', paper: '#1a2f1a' },
  },
  default: {
    primary: { main: '#64b5f6', light: '#90caf9', dark: '#1976d2' },
    secondary: { main: '#f06292' },
    background: { default: '#0a0a1a', paper: '#1a1a2e' },
  },
  sunset: {
    primary: { main: '#ff8a50', light: '#ffab70', dark: '#e65100' },
    secondary: { main: '#ff8f00' },
    background: { default: '#1a0f05', paper: '#2a1a0a' },
  },
  ocean: {
    primary: { main: '#4db6ac', light: '#80cbc4', dark: '#00695c' },
    secondary: { main: '#00acc1' },
    background: { default: '#001f1f', paper: '#002a2a' },
  },
  lavender: {
    primary: { main: '#ce93d8', light: '#e1bee7', dark: '#6a1b9a' },
    secondary: { main: '#ba68c8' },
    background: { default: '#0f0515', paper: '#1f0a2a' },
  },
  cherry: {
    primary: { main: '#ef5350', light: '#e57373', dark: '#c62828' },
    secondary: { main: '#f48fb1' },
    background: { default: '#1f0505', paper: '#2a0a0a' },
  },
};

export const themes = {};
for (const name of Object.keys(lightPalette)) {
  themes[name] = createTheme({ ...common, palette: { ...lightPalette[name], mode: 'light' } });
  themes[`${name}Dark`] = createTheme({
    ...common,
    ...darkOverrides,
    palette: { ...darkPalette[name], mode: 'dark' },
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
  forest: '#2e7d32',
  default: '#1976d2',
  sunset: '#e65100',
  ocean: '#00695c',
  lavender: '#6a1b9a',
  cherry: '#c62828',
};

export const defaultTheme = themes.forest;
