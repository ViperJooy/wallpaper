import { Box, CircularProgress } from '@mui/material';

export const LOADING_INDICATOR_SIZE = 32;

function Loading({ size = LOADING_INDICATOR_SIZE, color = 'primary', minHeight = 120 }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight,
        backgroundColor: 'transparent',
      }}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
}

export default Loading;
