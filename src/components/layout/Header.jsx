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

  return (
    <AppBar position="sticky" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: { xs: 1, sm: 0 },
            }}
          >
            <WallpaperIcon sx={{ fontSize: 28 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: '.1rem',
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
              sx={{ backgroundColor: 'rgba(255,255,255,0.1)', mr: 1 }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title={t('app.switchLang')}>
            <IconButton
              color="inherit"
              onClick={toggleLang}
              sx={{ backgroundColor: 'rgba(255,255,255,0.1)', mr: 1 }}
            >
              <TranslateIcon />
            </IconButton>
          </Tooltip>

          <IconButton
            color="inherit"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <PaletteIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Box sx={{ px: 2, py: 0.5 }}>
              <Typography variant="caption" color="text.secondary">{languages[lang]}</Typography>
            </Box>
            <Divider />
            {Object.entries(themeNames).map(([key, label]) => (
              <MenuItem
                key={key}
                selected={themeName === key}
                onClick={() => { setThemeName(key); setAnchorEl(null); }}
              >
                <ListItemIcon>
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: themeColors[key] }} />
                </ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
