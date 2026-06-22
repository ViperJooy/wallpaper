import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useAppContext } from '../context/AppContext';

function NotFound() {
  const navigate = useNavigate();
  const { darkMode } = useAppContext();
  const isDark = darkMode;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: 2,
      px: 2,
      backgroundColor: isDark ? '#111827' : '#FFFFFF',
    }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '5rem', md: '8rem' },
          fontWeight: 800,
          fontFamily: '"DM Sans", sans-serif',
          color: isDark ? '#4ADE80' : '#22C55E',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
        }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: isDark ? '#F9FAFB' : '#000000',
          fontSize: { xs: '1.1rem', md: '1.3rem' },
        }}
      >
        页面未找到
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: isDark ? '#9CA3AF' : '#6B7280',
          mb: 1,
        }}
      >
        您访问的页面不存在或已被移除
      </Typography>
      <Button
        variant="contained"
        startIcon={<HomeIcon />}
        onClick={() => navigate('/')}
        size="large"
        sx={{
          borderRadius: '12px',
          px: 4,
          py: 1.2,
          minHeight: 48,
        }}
      >
        返回首页
      </Button>
    </Box>
  );
}

export default NotFound;
