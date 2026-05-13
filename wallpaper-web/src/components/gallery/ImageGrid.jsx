import { useEffect, useRef, useCallback } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import ImageCard from './ImageCard';

function ImageGrid({ images = [], onLoadMore, hasMore = false, loading = false, onImageClick }) {
  const observerTarget = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading && onLoadMore) {
        onLoadMore();
      }
    },
    [hasMore, loading, onLoadMore]
  );

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleObserver]);

  return (
    <Box>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid
            item
            key={image.id || index}
            xs={6}
            sm={6}
            md={4}
            lg={3}
            xl={2.4}
          >
            <ImageCard image={image} onClick={onImageClick} />
          </Grid>
        ))}
      </Grid>

      {hasMore && (
        <Box
          ref={observerTarget}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100px',
            mt: 3,
          }}
        >
          {loading && <CircularProgress />}
        </Box>
      )}
    </Box>
  );
}

export default ImageGrid;
