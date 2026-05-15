import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { useAppContext } from '../../context/AppContext';

function Footer() {
  const { t } = useAppContext();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} {t('app.title')}. {t('app.allRightsReserved')}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          {t('app.dataSource')}:{' '}
          <MuiLink href="https://wp.shanhutech.cn" target="_blank" rel="noopener">
            Bird API
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
