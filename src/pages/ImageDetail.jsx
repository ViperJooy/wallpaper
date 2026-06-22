import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, IconButton, Button, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { downloadImage } from '../utils/download';
import { getFullUrl } from '../utils/imageUrl';
import { useAppContext } from '../context/AppContext';

function ImageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useAppContext();
  const isDark = darkMode;

  const handleDownload = async () => {
    const imageUrl = getFullUrl(id);
    await downloadImage(imageUrl, `wallpaper-${id}.jpg`);
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <ErrorBoundary>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 3, md: 4 } }}>
          {/* Top bar */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}>
            <IconButton
              onClick={handleClose}
              aria-label="返回"
              sx={{
                color: isDark ? '#F9FAFB' : '#000000',
                backgroundColor: isDark ? '#374151' : '#F3F4F6',
                borderRadius: '9999px',
                width: 44,
                height: 44,
                transition: 'all 150ms ease',
                '&:hover': {
                  backgroundColor: isDark ? '#4B5563' : '#E5E7EB',
                },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>

            <IconButton
              onClick={handleClose}
              aria-label="关闭"
              sx={{
                color: isDark ? '#F9FAFB' : '#000000',
                backgroundColor: isDark ? '#374151' : '#F3F4F6',
                borderRadius: '9999px',
                width: 44,
                height: 44,
                transition: 'all 150ms ease',
                '&:hover': {
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* Image container */}
          <Box
            sx={{
              backgroundColor: isDark ? '#1F2937' : '#F3F4F6',
              borderRadius: '20px',
              p: { xs: 1.5, md: 3 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Box
              component="img"
              src={getFullUrl(id)}
              alt={`壁纸 ${id}`}
              sx={{
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 320px)',
                objectFit: 'contain',
                borderRadius: '20px',
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip
                label={`图片 ID: ${id}`}
                sx={{
                  backgroundColor: isDark ? '#374151' : '#F3F4F6',
                  color: isDark ? '#F9FAFB' : '#000000',
                  fontWeight: 500,
                  borderRadius: '20px',
                }}
              />
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                sx={{
                  borderRadius: '12px',
                  px: 4,
                  minHeight: 48,
                }}
              >
                下载壁纸
              </Button>
            </Box>
          </Box>
        </Container>

        <Footer />
      </Box>
    </ErrorBoundary>
  );
}

export default ImageDetail;
