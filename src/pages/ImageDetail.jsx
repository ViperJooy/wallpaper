import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, IconButton, Button, Chip, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
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

  const handleDownload = async () => {
    const imageUrl = getFullUrl(id);
    await downloadImage(imageUrl, `wallpaper-${id}.jpg`);
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <ErrorBoundary>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'grey.900' }}>
        <Header />

        <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={handleClose}
              aria-label="关闭"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>

            <Paper
              elevation={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                p: 3,
                backgroundColor: 'grey.800',
              }}
            >
              <Box
                component="img"
                src={getFullUrl(id)}
                alt={`壁纸 ${id}`}
                sx={{
                  maxWidth: '100%',
                  maxHeight: 'calc(100vh - 300px)',
                  objectFit: 'contain',
                  borderRadius: 1,
                }}
              />

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Chip label={`图片 ID: ${id}`} sx={{ backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)', color: darkMode ? '#fff' : 'inherit' }} />
                <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>
                  下载壁纸
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>

        <Footer />
      </Box>
    </ErrorBoundary>
  );
}

export default ImageDetail;
