import { useState } from 'react';
import { Card, CardMedia, CardContent, Box, Chip, IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { downloadImage } from '../../utils/download';

function ImageCard({ image, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownload = async (e) => {
    e.stopPropagation();
    const filename = `wallpaper-${image.id || Date.now()}.jpg`;
    await downloadImage(image.url || image.img, filename);
  };

  const handlePreview = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(image);
    }
  };

  return (
    <Card
      sx={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePreview}
    >
      <Box sx={{ position: 'relative', paddingTop: '75%', backgroundColor: 'grey.200' }}>
        <CardMedia
          component="img"
          image={image.thumb || image.url || image.img}
          alt={image.tag || '壁纸'}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    maxWidth: '100%',
                  }}
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Tooltip title="预览">
                <IconButton
                  size="small"
                  onClick={handlePreview}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                    },
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="下载">
                <IconButton
                  size="small"
                  onClick={handleDownload}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
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
    </Card>
  );
}

export default ImageCard;
