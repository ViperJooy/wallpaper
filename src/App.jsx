import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Loading from './components/common/Loading';
import ErrorBoundary from './components/common/ErrorBoundary';
import { fetchBingData } from './services/bingService';
import { fetch360Category } from './services/qingService';

const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
const ImageDetail = lazy(() => import('./pages/ImageDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  useEffect(() => {
    fetchBingData().catch(() => {});
    fetch360Category(36).catch(() => {});
  }, []);

  return (
    <Router>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="/image/:id" element={<ImageDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Router>
  );
}

export default App;
