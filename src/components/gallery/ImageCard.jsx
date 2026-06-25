import { useState, useCallback } from 'react';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { downloadImage } from '../../utils/download';
import { getThumbUrl, toSecureImageUrl } from '../../utils/imageUrl';
import { useAppContext } from '../../context/AppContext';

function ImageCard({ image, onClick }) {
  const { t, darkMode } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const isDark = darkMode;
  const imageUrl = toSecureImageUrl(image.url || image.img);
  const thumbUrl = image.thumb ? toSecureImageUrl(image.thumb) : getThumbUrl(imageUrl);

  const handleDownload = useCallback(async (e) => {
    e.stopPropagation();
    const filename = `wallpaper-${image.id || Date.now()}.jpg`;
    await downloadImage(imageUrl, filename);
  }, [image, imageUrl]);

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
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: isDark ? '#1F2937' : '#F3F4F6',
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: isDark
              ? '0 4px 20px rgba(0, 0, 0, 0.3)'
              : '0 4px 20px rgba(0, 0, 0, 0.08)',
          },
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: isDark ? '#4ADE80' : '#22C55E',
          outlineOffset: '2px',
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
            backgroundColor: isDark ? '#1F2937' : '#F3F4F6',
          }}
        />
      )}
      <Box
        component="img"
        src={thumbUrl}
        alt={image.tag || '壁纸'}
        loading="lazy"
        onLoad={() => {
          setImageLoaded(true);
          setImageFailed(false);
        }}
        onError={() => {
          setImageLoaded(true);
          setImageFailed(true);
        }}
        sx={{
          display: 'block',
          width: '100%',
          height: 'auto',
          opacity: imageLoaded && !imageFailed ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      />
      {imageFailed && (
        <Box
          role="status"
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 1,
            textAlign: 'center',
            fontSize: '0.875rem',
            color: isDark ? '#F9FAFB' : '#374151',
            backgroundColor: isDark ? '#1F2937' : '#F3F4F6',
          }}
        >
          图片加载失败
        </Box>
      )}

      {/* Hover overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)'
            : 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.4) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 1.5,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 150ms ease',
          pointerEvents: isHovered ? 'auto' : 'none',
        }}
      >
        {/* Tag */}
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          {image.tag && (
            <Chip
              label={image.tag}
              size="small"
              sx={{
                backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                color: isDark ? '#F9FAFB' : '#000000',
                fontWeight: 500,
                fontSize: '0.75rem',
                height: 28,
                borderRadius: '20px',
                '& .MuiChip-label': { px: 1 },
              }}
            />
          )}
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Tooltip title={t('app.preview')}>
            <IconButton
              size="small"
              onClick={handlePreview}
              aria-label={t('app.preview')}
              sx={{
                width: 44,
                height: 44,
                borderRadius: '9999px',
                backgroundColor: isDark ? '#4ADE80' : '#22C55E',
                color: '#FFFFFF',
                transition: 'all 150ms ease',
                '&:hover': {
                  backgroundColor: isDark ? '#22C55E' : '#16A34A',
                  transform: 'scale(1.06)',
                },
              }}
            >
              <VisibilityIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('app.download')}>
            <IconButton
              size="small"
              onClick={handleDownload}
              aria-label={t('app.download')}
              sx={{
                width: 44,
                height: 44,
                borderRadius: '9999px',
                backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                color: isDark ? '#F9FAFB' : '#000000',
                transition: 'all 150ms ease',
                '&:hover': {
                  backgroundColor: isDark ? '#374151' : '#FFFFFF',
                  transform: 'scale(1.06)',
                },
              }}
            >
              <DownloadIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default ImageCard;
