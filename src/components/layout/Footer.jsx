import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { useAppContext } from '../../context/AppContext';

function Footer() {
  const { t, darkMode } = useAppContext();
  const isDark = darkMode;

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: isDark ? '#111827' : '#FFFFFF',
        borderTop: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="body2"
          align="center"
          sx={{ color: isDark ? '#9CA3AF' : '#6B7280' }}
        >
          © {new Date().getFullYear()} {t('app.title')}. {t('app.allRightsReserved')}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 0.75, color: isDark ? '#9CA3AF' : '#6B7280' }}
        >
          {t('app.dataSource')}:{' '}
          <MuiLink
            href="https://wp.shanhutech.cn"
            target="_blank"
            rel="noopener"
            sx={{
              textDecoration: 'none',
              color: isDark ? '#60A5FA' : '#3B82F6',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Bird API
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
