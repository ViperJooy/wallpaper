import { Component } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';

// Wrapper to provide dark mode context to the class component
function ErrorBoundaryInner({ children, isDark }) {
  return <ErrorBoundaryClass isDark={isDark}>{children}</ErrorBoundaryClass>;
}

class ErrorBoundaryClass extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const isDark = this.props.isDark;
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
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
              backgroundColor: isDark ? '#374151' : '#FEF2F2',
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 32, color: '#EF4444' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            出错了
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: isDark ? '#9CA3AF' : '#6B7280', maxWidth: 360 }}>
            {this.state.error?.message || '发生了未知错误'}
          </Typography>
          <Button variant="contained" onClick={this.handleReset} sx={{ mt: 1 }}>
            重试
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Default export uses a wrapper that reads context
import { useAppContext } from '../../context/AppContext';

function ErrorBoundary({ children }) {
  const { darkMode } = useAppContext();
  return <ErrorBoundaryInner isDark={darkMode}>{children}</ErrorBoundaryInner>;
}

export default ErrorBoundary;
