import { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip, Divider } from '@mui/material';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import PaletteIcon from '@mui/icons-material/Palette';
import TranslateIcon from '@mui/icons-material/Translate';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { themeNames, themeColors } from '../../theme/theme';
import { languages } from '../../i18n';

function Header() {
  const { themeName, setThemeName, darkMode, toggleDarkMode, lang, toggleLang, t } = useAppContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const isDark = darkMode;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
        borderBottom: '1px solid',
        borderColor: isDark ? '#374151' : '#E5E7EB',
        transition: 'background-color 150ms ease',
        color: isDark ? '#F9FAFB' : '#000000',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, md: 64 } }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: { xs: 1, sm: 0 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '12px',
                backgroundColor: isDark ? '#4ADE80' : '#22C55E',
              }}
            >
              <WallpaperIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.05rem', md: '1.15rem' },
              }}
            >
              {t('app.title')}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title={darkMode ? t('app.lightMode') : t('app.darkMode')}>
            <IconButton
              color="inherit"
              onClick={toggleDarkMode}
              sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                backgroundColor: isDark ? '#374151' : '#F3F4F6',
                color: isDark ? '#F9FAFB' : '#6B7280',
                mr: 1,
                transition: 'all 150ms ease',
                '&:hover': {
                  backgroundColor: isDark ? '#4B5563' : '#E5E7EB',
                },
              }}
            >
              {darkMode ? <LightModeIcon sx={{ fontSize: 20 }} /> : <DarkModeIcon sx={{ fontSize: 20 }} />}
            </IconButton>
          </Tooltip>

          <Tooltip title={t('app.switchLang')}>
            <IconButton
              color="inherit"
              onClick={toggleLang}
              sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                backgroundColor: isDark ? '#374151' : '#F3F4F6',
                color: isDark ? '#F9FAFB' : '#6B7280',
                mr: 1,
                transition: 'all 150ms ease',
                '&:hover': {
                  backgroundColor: isDark ? '#4B5563' : '#E5E7EB',
                },
              }}
            >
              <TranslateIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          <IconButton
            color="inherit"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              backgroundColor: isDark ? '#374151' : '#F3F4F6',
              color: isDark ? '#F9FAFB' : '#6B7280',
              transition: 'all 150ms ease',
              '&:hover': {
                backgroundColor: isDark ? '#4B5563' : '#E5E7EB',
              },
            }}
          >
            <PaletteIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  borderRadius: '16px',
                  minWidth: 180,
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                },
              },
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="overline" sx={{ color: isDark ? '#9CA3AF' : '#6B7280' }}>
                {languages[lang]}
              </Typography>
            </Box>
            <Divider sx={{ mx: 1, borderColor: isDark ? '#374151' : '#E5E7EB' }} />
            {Object.entries(themeNames).map(([key, label]) => (
              <MenuItem
                key={key}
                selected={themeName === key}
                onClick={() => { setThemeName(key); setAnchorEl(null); }}
                sx={{
                  borderRadius: '8px',
                  mx: 1,
                  my: 0.5,
                  gap: 1.5,
                  color: isDark ? '#F9FAFB' : '#000000',
                  '&.Mui-selected': {
                    backgroundColor: isDark ? '#374151' : '#F3F4F6',
                  },
                  '&:hover': {
                    backgroundColor: isDark ? '#374151' : '#F3F4F6',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Box sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '9999px',
                    backgroundColor: themeColors[key],
                  }} />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: themeName === key ? 600 : 400,
                  }}
                />
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
