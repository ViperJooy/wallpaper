import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function SearchBar({ value = '', onChange, onSearch, placeholder = '搜索壁纸...' }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange?.('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch?.(localValue);
  };

  return (
    <TextField
      fullWidth
      value={localValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      variant="outlined"
      aria-label={placeholder}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'background.paper',
          borderRadius: '8px',
          pr: 0.5,
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'text.secondary' }} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {localValue && (
              <IconButton size="small" onClick={handleClear} sx={{ mr: 0.5 }}>
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton
              size="small"
              onClick={() => onSearch?.(localValue)}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: '6px',
                '&:hover': { bgcolor: 'primary.dark' },
                '& .MuiSvgIcon-root': { fontSize: 20 },
              }}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
