import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ImageGrid from '../components/gallery/ImageGrid';
import ImageDetail from '../components/gallery/ImageDetail';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { useWallpapers } from '../hooks/useWallpapers';
import { BIRD_CATEGORIES, QING_CATEGORIES } from '../constants/categories';
import { useAppContext } from '../context/AppContext';

function Category() {
  const { t, currentSource } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [detailOpen, setDetailOpen] = useState(false);

  const categories = currentSource === 'qing' ? QING_CATEGORIES : BIRD_CATEGORIES;
  const category = categories.find(cat => cat.id === parseInt(id));
  const { wallpapers, loading, error, hasMore, loadMore, refresh } = useWallpapers(currentSource, parseInt(id), 1, 12);
  const safeWallpapers = Array.isArray(wallpapers) ? wallpapers : [];

  const handleImageClick = (image) => {
    const index = safeWallpapers.findIndex(img => img.id === image.id);
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
    setSelectedImage(null);
    setSelectedImageIndex(-1);
  };

  const handlePrevious = () => {
    if (selectedImageIndex > 0) {
      const prevImage = safeWallpapers[selectedImageIndex - 1];
      setSelectedImage(prevImage);
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex < safeWallpapers.length - 1) {
      const nextImage = safeWallpapers[selectedImageIndex + 1];
      setSelectedImage(nextImage);
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <ErrorBoundary>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <IconButton onClick={() => navigate('/')} aria-label={t('app.backHome')}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {category ? category.name : `${t('app.categoryPrefix')} ${id}`}
            </Typography>
          </Box>

          {error && safeWallpapers.length === 0 ? (
            <EmptyState title={t('app.loadFailed')} description={error} actionLabel={t('app.retry')} onAction={refresh} />
          ) : loading && safeWallpapers.length === 0 ? (
            <Loading />
          ) : safeWallpapers.length === 0 ? (
            <EmptyState title={t('app.noWallpapersInCategory')} />
          ) : (
            <ImageGrid
              images={safeWallpapers}
              onLoadMore={loadMore}
              hasMore={hasMore}
              loading={loading}
              onImageClick={handleImageClick}
            />
          )}
        </Container>

        <Footer />

        <ImageDetail
          image={selectedImage}
          open={detailOpen}
          onClose={handleDetailClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={selectedImageIndex > 0}
          hasNext={selectedImageIndex < safeWallpapers.length - 1}
        />
      </Box>
    </ErrorBoundary>
  );
}

export default Category;
