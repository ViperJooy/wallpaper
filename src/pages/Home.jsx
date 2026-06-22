import { useState } from 'react';
import { Box, Container, Typography, Chip, Tabs, Tab } from '@mui/material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SearchBar from '../components/search/SearchBar';
import ImageGrid from '../components/gallery/ImageGrid';
import ImageDetail from '../components/gallery/ImageDetail';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { useWallpapers } from '../hooks/useWallpapers';
import { useSearch } from '../hooks/useSearch';
import { useAppContext } from '../context/AppContext';
import { BIRD_CATEGORIES, QING_CATEGORIES } from '../constants/categories';
import { SOURCES, BING_MONTHS } from '../constants/sources';

function Home() {
  const { searchKeyword, setSearchKeyword, t, currentSource, setCurrentSource, darkMode } = useAppContext();
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

  const isDark = darkMode;

  return (
    <ErrorBoundary>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        {/* Hero — friendly, clean */}
        <Box sx={{ py: { xs: 4, md: 6 }, px: 2 }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 800,
                mb: 1,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                letterSpacing: '-0.02em',
                color: isDark ? '#F9FAFB' : '#000000',
              }}
            >
              {t('app.title')}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                mb: 4,
                color: isDark ? '#9CA3AF' : '#6B7280',
                fontSize: { xs: '0.9375rem', md: '1.0625rem' },
              }}
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

        {/* Content */}
        <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 3, md: 4 } }}>
          <Tabs
            value={currentSource}
            onChange={handleSourceChange}
            centered
            sx={{
              mb: 3,
              '& .MuiTabs-indicator': {
                backgroundColor: isDark ? '#4ADE80' : '#22C55E',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            {SOURCES.map(s => (
              <Tab key={s.id} value={s.id} label={s.label} sx={{ color: isDark ? '#9CA3AF' : '#6B7280' }} />
            ))}
          </Tabs>

          {!isSearching && showCategories && (
            <>
              <Typography
                variant="overline"
                sx={{ mb: 1.5, display: 'block', color: isDark ? '#9CA3AF' : '#6B7280' }}
              >
                {t('app.hotRecommend')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {currentCategories.map(cat => (
                  <Chip
                    key={cat.id}
                    label={cat.name}
                    variant={currentCatId === cat.id ? 'filled' : 'outlined'}
                    color={currentCatId === cat.id ? 'primary' : 'default'}
                    onClick={() => setCurrentCatId(cat.id)}
                    clickable
                    sx={{
                      fontWeight: currentCatId === cat.id ? 600 : 400,
                    }}
                  />
                ))}
              </Box>
            </>
          )}

          {!isSearching && currentSource === 'bing' && (
            <>
              <Typography
                variant="overline"
                sx={{ mb: 1.5, display: 'block', color: isDark ? '#9CA3AF' : '#6B7280' }}
              >
                {t('app.hotRecommend')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {BING_MONTHS.map(m => (
                  <Chip
                    key={m.id}
                    label={m.label}
                    variant={bingMonth === m.id ? 'filled' : 'outlined'}
                    color={bingMonth === m.id ? 'primary' : 'default'}
                    onClick={() => setBingMonth(m.id)}
                    clickable
                    sx={{
                      fontWeight: bingMonth === m.id ? 600 : 400,
                    }}
                  />
                ))}
              </Box>
            </>
          )}

          {isSearching && (
            <Typography
              variant="overline"
              sx={{ mb: 3, display: 'block', color: isDark ? '#9CA3AF' : '#6B7280' }}
              aria-live="polite"
            >
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
            <Loading />
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
