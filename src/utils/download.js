export const downloadImage = async (imageUrl, filename) => {
  if (!imageUrl) {
    console.warn('downloadImage: no URL provided');
    return false;
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'wallpaper.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    return true;
  } catch {
    window.open(imageUrl, '_blank');
    return false;
  }
};
