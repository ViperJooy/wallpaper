import { useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Chip,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { downloadImage } from '../../utils/download';

function ImageDetail({ image, open, onClose, onPrevious, onNext, hasPrevious, hasNext }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDownload = async () => {
    if (image) {
      const filename = `wallpaper-${image.id || Date.now()}.jpg`;
      await downloadImage(image.url || image.img, filename);
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (!open) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrevious && onPrevious) {
            onPrevious();
          }
          break;
        case 'ArrowRight':
          if (hasNext && onNext) {
            onNext();
          }
          break;
        default:
          break;
      }
    },
    [open, onClose, onPrevious, onNext, hasPrevious, hasNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!image) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullScreen
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
        },
      }}
    >
      <IconButton
        onClick={onClose}
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

      {hasPrevious && onPrevious && !isMobile && (
        <IconButton
          onClick={onPrevious}
          sx={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            zIndex: 1,
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      )}

      {hasNext && onNext && !isMobile && (
        <IconButton
          onClick={onNext}
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            zIndex: 1,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 },
          gap: 2,
        }}
      >
        <Box
          component="img"
          src={image.url || image.img}
          alt={image.tag || '壁纸'}
          sx={{
            maxWidth: '100%',
            maxHeight: { xs: 'calc(100vh - 150px)', sm: 'calc(100vh - 200px)' },
            objectFit: 'contain',
            borderRadius: 1,
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: 2,
            width: '100%',
            maxWidth: 600,
          }}
        >
          {image.tag && (
            <Chip
              label={image.tag}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
            />
          )}

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            sx={{ ml: 'auto' }}
          >
            下载壁纸
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ImageDetail;
