import { useEffect, useRef, useCallback } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import ImageCard from './ImageCard';

function ImageGrid({ images = [], onLoadMore, hasMore = false, loading = false, onImageClick }) {
  const observerTarget = useRef(null);
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const onLoadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMoreRef.current && !loadingRef.current && onLoadMoreRef.current) {
        onLoadMoreRef.current();
      }
    }, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box>
      <Grid container spacing={2} columns={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }}>
        {images.map((image, index) => (
          <Grid
            key={image.id || `${image.url || image.img}-${index}`}
            size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
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
