export function getThumbUrl(url) {
  if (!url) return url;

  if (url.includes('qhimg.com')) {
    return url.replace(/\/bdr\/__\d+/, '/bdr/__200');
  }

  if (url.includes('bing.com/th')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}pid=hp&w=400&h=250&rs=1&c=4`;
  }

  return url;
}

export function getFullUrl(id) {
  if (!id) return '';
  if (id.startsWith('http')) return id;
  return `https://wp.shanhutech.cn/intf/image/${id}`;
}
