import { Box, Skeleton } from '@mui/material';

function SkeletonGrid({ count = 12 }) {
  return (
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
        gap: 1,
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <Skeleton
          key={i}
          variant="rounded"
          sx={{
            paddingTop: '56.25%',
            borderRadius: '2px',
            transform: 'none',
          }}
          animation="wave"
        />
      ))}
    </Box>
  );
}

export default SkeletonGrid;
