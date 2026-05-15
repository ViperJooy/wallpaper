import { Box, Typography, Button } from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

function EmptyState({
  icon: Icon = ImageSearchIcon,
  title = '暂无内容',
  description = '',
  actionLabel = '',
  onAction = null,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        p: 3,
        gap: 2,
      }}
    >
      <Icon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.5 }} />
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" align="center">
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;
