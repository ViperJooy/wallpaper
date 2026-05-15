export const downloadImage = async (imageUrl, filename) => {
  if (!imageUrl) {
    console.warn('downloadImage: no URL provided');
    return false;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename || 'wallpaper.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
            resolve(true);
          } else {
            window.open(imageUrl, '_blank');
            resolve(false);
          }
        }, 'image/jpeg', 0.95);
      } catch {
        window.open(imageUrl, '_blank');
        resolve(false);
      }
    };
    img.onerror = () => {
      console.warn('downloadImage: image load failed, opening in new tab');
      window.open(imageUrl, '_blank');
      resolve(false);
    };
    img.src = imageUrl;
  });
};
