import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function SearchBar({ value = '', onChange, onSearch, placeholder = '搜索壁纸...' }) {
  const { darkMode } = useAppContext();
  const isDark = darkMode;
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
        maxWidth: 560,
        mx: 'auto',
        display: 'block',
        '& .MuiOutlinedInput-root': {
          backgroundColor: isDark ? '#374151' : '#F3F4F6',
          borderRadius: '12px',
          height: 48,
          pr: 0.5,
          transition: 'all 150ms ease',
          '& fieldset': { border: 'none' },
          '&:hover': {
            backgroundColor: isDark ? '#4B5563' : '#E5E7EB',
          },
          '&.Mui-focused': {
            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
            boxShadow: isDark
              ? '0 0 0 2px rgba(74, 222, 128, 0.3)'
              : '0 0 0 2px rgba(34, 197, 94, 0.2)',
          },
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: isDark ? '#9CA3AF' : '#6B7280', fontSize: 22 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {localValue && (
                <IconButton
                  size="small"
                  onClick={handleClear}
                  sx={{
                    mr: 0.5,
                    width: 28,
                    height: 28,
                    borderRadius: '9999px',
                    color: isDark ? '#9CA3AF' : '#6B7280',
                    '&:hover': { color: isDark ? '#F9FAFB' : '#000000' },
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton
                size="small"
                onClick={() => onSearch?.(localValue)}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '9999px',
                  backgroundColor: isDark ? '#4ADE80' : '#22C55E',
                  color: '#FFFFFF',
                  transition: 'all 150ms ease',
                  '&:hover': {
                    backgroundColor: isDark ? '#22C55E' : '#16A34A',
                  },
                  '& .MuiSvgIcon-root': { fontSize: 18 },
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default SearchBar;
