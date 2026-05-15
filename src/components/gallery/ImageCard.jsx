import { useState, useCallback } from 'react';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { downloadImage } from '../../utils/download';
import { getThumbUrl } from '../../utils/imageUrl';
import { useAppContext } from '../../context/AppContext';

function ImageCard({ image, onClick }) {
  const { t, darkMode } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownload = useCallback(async (e) => {
    e.stopPropagation();
    const filename = `wallpaper-${image.id || Date.now()}.jpg`;
    await downloadImage(image.url || image.img, filename);
  }, [image]);

  const handlePreview = useCallback((e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(image);
    }
  }, [onClick, image]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePreview(e);
    }
  }, [handlePreview]);

  return (
    <Box
      role="button"
      tabIndex={0}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: 0.5,
        overflow: 'hidden',
        backgroundColor: 'grey.200',
        outline: '2px solid transparent',
        outlineOffset: '2px',
        transition: 'box-shadow 0.3s ease, outline-color 0.3s ease',
        '@media (hover: hover)': {
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            outlineColor: 'primary.main',
          },
        },
        '&:focus-visible': {
          outlineColor: 'primary.main',
          boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.3)',
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePreview}
      onKeyDown={handleKeyDown}
      aria-label={image.tag || `壁纸 ${image.id || ''}`}
    >
      {!imageLoaded && (
        <Box
          sx={{
            width: '100%',
            paddingTop: '56.25%',
            backgroundColor: 'action.hover',
            '@media (prefers-reduced-motion: no-preference)': {
              animation: 'shimmer 1.5s ease-in-out infinite',
            },
            '@keyframes shimmer': {
              '0%': { opacity: 1 },
              '50%': { opacity: 0.4 },
              '100%': { opacity: 1 },
            },
          }}
        />
      )}
      <Box
        component="img"
        src={image.thumb || getThumbUrl(image.url || image.img)}
        alt={image.tag || '壁纸'}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)}
        sx={{
          display: 'block',
          width: '100%',
          height: 'auto',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

        {isHovered && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 2,
              transition: 'opacity 0.3s ease',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {image.tag && (
                <Chip
                  label={image.tag}
                  size="small"
                  sx={{
                    backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    color: darkMode ? '#fff' : 'inherit',
                    maxWidth: '100%',
                  }}
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Tooltip title={t('app.preview')}>
                <IconButton
                  size="small"
                  onClick={handlePreview}
                  aria-label={t('app.preview')}
                  sx={{
                    backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    color: darkMode ? '#fff' : 'inherit',
                    '&:hover': {
                      backgroundColor: darkMode ? 'rgba(60, 60, 60, 1)' : 'rgba(255, 255, 255, 1)',
                    },
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('app.download')}>
                <IconButton
                  size="small"
                  onClick={handleDownload}
                  aria-label={t('app.download')}
                  sx={{
                    backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    color: darkMode ? '#fff' : 'inherit',
                    '&:hover': {
                      backgroundColor: darkMode ? 'rgba(60, 60, 60, 1)' : 'rgba(255, 255, 255, 1)',
                    },
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        )}
    </Box>
  );
}

export default ImageCard;
