import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function SearchBar({ value = '', onChange, onSearch, placeholder = '搜索壁纸...' }) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleClear = () => {
    setLocalValue('');
    if (onChange) {
      onChange('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(localValue);
    }
  };

  return (
    <TextField
      fullWidth
      value={localValue}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'background.paper',
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: localValue && (
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleClear}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
