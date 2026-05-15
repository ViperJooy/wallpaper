import { Box, CircularProgress } from '@mui/material';

function Loading({ size = 40, color = 'primary' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        width: '100%',
      }}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
}

export default Loading;
