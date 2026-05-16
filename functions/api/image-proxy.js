export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get('url');

  if (!imageUrl) {
    return new Response('Missing url', { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Fetch failed');

    const contentType = response.headers.get('Content-Type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new Response('Proxy failed', { status: 502 });
  }
}
