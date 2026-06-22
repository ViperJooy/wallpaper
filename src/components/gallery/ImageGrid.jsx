import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import Loading from '../common/Loading';
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
            xl: 'repeat(5, 1fr)',
          },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {images.map((image, index) => (
          <ImageCard
            key={image.id || `${image.url || image.img}-${index}`}
            image={image}
            onClick={onImageClick}
          />
        ))}
      </Box>

      {hasMore && (
        <Box
          ref={observerTarget}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 96,
            mt: 3,
            backgroundColor: 'transparent',
          }}
        >
          {loading && <Loading minHeight={96} />}
        </Box>
      )}
    </Box>
  );
}

export default ImageGrid;
