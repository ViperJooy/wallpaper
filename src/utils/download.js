export const downloadImage = async (imageUrl, filename) => {
  if (!imageUrl) {
    console.warn('downloadImage: no URL provided');
    return false;
  }

  try {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = '_blank';
    link.download = filename || 'wallpaper.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch {
    window.open(imageUrl, '_blank');
    return false;
  }
};
