import { useEffect, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Chip,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { downloadImage } from '../../utils/download';
import { useAppContext } from '../../context/AppContext';

function ImageDetail({ image, open, onClose, onPrevious, onNext, hasPrevious, hasNext }) {
  const { t, darkMode } = useAppContext();
  const isDark = darkMode;
  const touchStartX = useRef(null);

  const handleDownload = useCallback(async () => {
    if (image) {
      const filename = `wallpaper-${image.id || Date.now()}.jpg`;
      await downloadImage(image.url || image.img, filename);
    }
  }, [image]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!open) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrevious && onPrevious) onPrevious();
          break;
        case 'ArrowRight':
          if (hasNext && onNext) onNext();
          break;
        default:
          break;
      }
    },
    [open, onClose, onPrevious, onNext, hasPrevious, hasNext]
  );

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && hasPrevious && onPrevious) {
        onPrevious();
      } else if (diff < 0 && hasNext && onNext) {
        onNext();
      }
    }
    touchStartX.current = null;
  }, [hasPrevious, hasNext, onPrevious, onNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!image) return null;

  const navButtonSx = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: isDark ? '#F9FAFB' : '#000000',
    backgroundColor: isDark ? '#374151' : '#F3F4F6',
    width: 44,
    height: 44,
    borderRadius: '9999px',
    transition: 'all 150ms ease',
    zIndex: 1,
    '&:hover': {
      backgroundColor: isDark ? '#4ADE80' : '#22C55E',
      color: '#FFFFFF',
      transform: 'translateY(-50%) scale(1.06)',
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullScreen
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: isDark ? '#111827' : '#FFFFFF',
          borderRadius: '20px',
        },
        '& .MuiBackdrop-root': {
          backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label={t('app.close')}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: isDark ? '#F9FAFB' : '#000000',
          backgroundColor: isDark ? '#374151' : '#F3F4F6',
          width: 44,
          height: 44,
          borderRadius: '9999px',
          zIndex: 1,
          transition: 'all 150ms ease',
          '&:hover': {
            backgroundColor: '#EF4444',
            color: '#FFFFFF',
            transform: 'scale(1.06)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      {hasPrevious && onPrevious && (
        <IconButton
          onClick={onPrevious}
          aria-label="上一张"
          sx={{ ...navButtonSx, left: { xs: 8, sm: 16 } }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      )}

      {hasNext && onNext && (
        <IconButton
          onClick={onNext}
          aria-label="下一张"
          sx={{ ...navButtonSx, right: { xs: 8, sm: 16 } }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}

      <DialogContent
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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
            borderRadius: '20px',
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
                backgroundColor: isDark ? '#374151' : '#F3F4F6',
                color: isDark ? '#F9FAFB' : '#000000',
                fontWeight: 500,
                borderRadius: '20px',
              }}
            />
          )}

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            sx={{
              ml: { sm: 'auto' },
              borderRadius: '12px',
              px: 4,
              minHeight: 48,
            }}
          >
            {t('app.download')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ImageDetail;
