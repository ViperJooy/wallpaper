import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { Link } from 'react-router-dom';

function Header() {
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
              壁纸精选
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
