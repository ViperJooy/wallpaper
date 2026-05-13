import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Loading from './components/common/Loading';

const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
const ImageDetail = lazy(() => import('./pages/ImageDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/image/:id" element={<ImageDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Box>
    </Router>
  );
}

export default App;
