import { Box, Typography, Button } from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { useAppContext } from '../../context/AppContext';

function EmptyState({
  icon: Icon = ImageSearchIcon,
  title = '暂无内容',
  description = '',
  actionLabel = '',
  onAction = null,
}) {
  const { darkMode } = useAppContext();
  const isDark = darkMode;

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
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark ? '#374151' : '#F3F4F6',
        }}
      >
        <Icon sx={{ fontSize: 32, color: isDark ? '#9CA3AF' : '#6B7280' }} />
      </Box>
      <Typography variant="h6" sx={{ color: isDark ? '#F9FAFB' : '#000000', fontWeight: 600 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" align="center" sx={{ color: isDark ? '#9CA3AF' : '#6B7280', maxWidth: 360 }}>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction} sx={{ mt: 1 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;
