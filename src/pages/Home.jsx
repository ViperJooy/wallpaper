import { useState } from 'react';
import { Box, Container, Typography, Chip, Stack, Tabs, Tab } from '@mui/material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SearchBar from '../components/search/SearchBar';
import ImageGrid from '../components/gallery/ImageGrid';
import ImageDetail from '../components/gallery/ImageDetail';
import SkeletonGrid from '../components/common/SkeletonGrid';
import EmptyState from '../components/common/EmptyState';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { useWallpapers } from '../hooks/useWallpapers';
import { useSearch } from '../hooks/useSearch';
import { useAppContext } from '../context/AppContext';
import { BIRD_CATEGORIES, QING_CATEGORIES } from '../constants/categories';
import { SOURCES, BING_MONTHS } from '../constants/sources';

function Home() {
  const { searchKeyword, setSearchKeyword, t, currentSource, setCurrentSource } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [detailOpen, setDetailOpen] = useState(false);

  const [birdCategoryId, setBirdCategoryId] = useState(36);
  const [qingCategoryId, setQingCategoryId] = useState(36);
  const [bingMonth, setBingMonth] = useState('all');

  const categoryId = currentSource === 'qing' ? qingCategoryId : birdCategoryId;

  const { wallpapers, loading: wallpapersLoading, error: wallpapersError, hasMore: wallpapersHasMore, loadMore: loadMoreWallpapers, refresh: refreshWallpapers } =
    useWallpapers(currentSource, categoryId, 1, currentSource === 'bird' ? 20 : 30, bingMonth);

  const { results: searchResults, loading: searchLoading, error: searchError, hasMore: searchHasMore, search, loadMore: loadMoreSearch } =
    useSearch(currentSource, categoryId, '', 12);

  const isSearching = searchKeyword.trim().length > 0;
  const displayImages = Array.isArray(isSearching ? searchResults : wallpapers)
    ? (isSearching ? searchResults : wallpapers)
    : [];
  const loading = isSearching ? searchLoading : wallpapersLoading;
  const hasMore = isSearching ? searchHasMore : wallpapersHasMore;
  const error = isSearching ? searchError : wallpapersError;

  const handleSourceChange = (_, newValue) => {
    setCurrentSource(newValue);
    setSearchKeyword('');
  };

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handleSearch = (value) => {
    setSearchKeyword(value);
    search(value);
  };

  const handleImageClick = (image) => {
    const index = displayImages.findIndex(img => img.id === image.id);
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
      const prevImage = displayImages[selectedImageIndex - 1];
      setSelectedImage(prevImage);
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex < displayImages.length - 1) {
      const nextImage = displayImages[selectedImageIndex + 1];
      setSelectedImage(nextImage);
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleLoadMore = () => {
    if (isSearching) {
      loadMoreSearch();
    } else {
      loadMoreWallpapers();
    }
  };

  const showCategories = !isSearching && (
    currentSource === 'bird' || currentSource === 'qing'
  );

  const currentCategories = currentSource === 'qing' ? QING_CATEGORIES : BIRD_CATEGORIES;
  const currentCatId = currentSource === 'qing' ? qingCategoryId : birdCategoryId;
  const setCurrentCatId = currentSource === 'qing' ? setQingCategoryId : setBirdCategoryId;

  return (
    <ErrorBoundary>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <Box
          sx={(theme) => ({
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`,
            color: 'white',
            py: { xs: 4, md: 6 },
            px: 2,
          })}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              {t('app.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ mb: 4, opacity: 0.9, fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              {t('app.tagline')}
            </Typography>
            <SearchBar
              value={searchKeyword}
              onChange={handleSearchChange}
              onSearch={handleSearch}
              placeholder={t('app.searchPlaceholder')}
            />
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
          <Tabs
            value={currentSource}
            onChange={handleSourceChange}
            centered
            sx={{ mb: 3 }}
          >
            {SOURCES.map(s => (
              <Tab key={s.id} value={s.id} label={s.label} />
            ))}
          </Tabs>

          {!isSearching && showCategories && (
            <>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                {t('app.hotRecommend')}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                {currentCategories.map(cat => (
                  <Chip
                    key={cat.id}
                    label={cat.name}
                    variant={currentCatId === cat.id ? 'filled' : 'outlined'}
                    color={currentCatId === cat.id ? 'primary' : 'default'}
                    onClick={() => setCurrentCatId(cat.id)}
                    clickable
                  />
                ))}
              </Stack>
            </>
          )}

          {!isSearching && currentSource === 'bing' && (
            <>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                {t('app.hotRecommend')}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                {BING_MONTHS.map(m => (
                  <Chip
                    key={m.id}
                    label={m.label}
                    variant={bingMonth === m.id ? 'filled' : 'outlined'}
                    color={bingMonth === m.id ? 'primary' : 'default'}
                    onClick={() => setBingMonth(m.id)}
                    clickable
                  />
                ))}
              </Stack>
            </>
          )}

          {isSearching && (
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }} aria-live="polite">
              {t('app.searchResult')}: "{searchKeyword}"
            </Typography>
          )}

          {error && displayImages.length === 0 ? (
            <EmptyState
              title={t('app.loadFailed')}
              description={error}
              actionLabel={t('app.retry')}
              onAction={isSearching ? () => search(searchKeyword) : refreshWallpapers}
            />
          ) : loading && displayImages.length === 0 ? (
            <SkeletonGrid count={20} />
          ) : displayImages.length === 0 ? (
            <EmptyState
              title={isSearching ? t('app.noResults') : t('app.noWallpapers')}
              description={isSearching ? t('app.tryOtherKeywords') : ''}
            />
          ) : (
            <ImageGrid
              images={displayImages}
              onLoadMore={handleLoadMore}
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
          hasNext={selectedImageIndex < displayImages.length - 1}
        />
      </Box>
    </ErrorBoundary>
  );
}

export default Home;
