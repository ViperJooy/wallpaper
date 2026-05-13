import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SearchBar from '../components/search/SearchBar';
import DataSourceTabs from '../components/search/DataSourceTabs';
import ImageGrid from '../components/gallery/ImageGrid';
import ImageDetail from '../components/gallery/ImageDetail';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { useWallpapers } from '../hooks/useWallpapers';
import { useSearch } from '../hooks/useSearch';
import { useAppContext } from '../context/AppContext';

function Home() {
  const { dataSource, setDataSource, searchKeyword, setSearchKeyword } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [detailOpen, setDetailOpen] = useState(false);

  const { wallpapers, loading: wallpapersLoading, hasMore: wallpapersHasMore, loadMore: loadMoreWallpapers } = useWallpapers(36, 1, 20);
  const { results: searchResults, loading: searchLoading, hasMore: searchHasMore, search, loadMore: loadMoreSearch } = useSearch('', 12);

  const isSearching = searchKeyword.trim().length > 0;
  const displayImages = Array.isArray(isSearching ? searchResults : wallpapers)
    ? (isSearching ? searchResults : wallpapers)
    : [];
  const loading = isSearching ? searchLoading : wallpapersLoading;
  const hasMore = isSearching ? searchHasMore : wallpapersHasMore;

  const handleSearchChange = (value) => {
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

  return (
    <ErrorBoundary>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: { xs: 6, md: 8 },
            px: 2,
          }}
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
              发现精美壁纸
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ mb: 4, opacity: 0.9, fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              搜索数万张高清壁纸
            </Typography>
            <SearchBar
              value={searchKeyword}
              onChange={handleSearchChange}
              placeholder="搜索你喜欢的壁纸..."
            />
            <Box sx={{ mt: 3 }}>
              <DataSourceTabs value={dataSource} onChange={setDataSource} />
            </Box>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            {isSearching ? `搜索结果: "${searchKeyword}"` : '热门推荐'}
          </Typography>

          {loading && displayImages.length === 0 ? (
            <Loading />
          ) : displayImages.length === 0 ? (
            <EmptyState
              title={isSearching ? '未找到相关壁纸' : '暂无壁纸'}
              description={isSearching ? '尝试使用其他关键词搜索' : ''}
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
