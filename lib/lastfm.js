const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

/**
 * Fetches top tracks for a given Last.fm mood/genre tag.
 * @param {string} tag - A Last.fm tag (e.g. 'happy', 'chill', 'energetic')
 * @param {number} limit - Number of tracks to return (max 50)
 */
export async function getTracksByTag(tag, limit = 20) {
  const apiKey = process.env.LASTFM_API_KEY;
  if (!apiKey) throw new Error('LASTFM_API_KEY is not set.');

  const url = new URL(BASE_URL);
  url.searchParams.set('method', 'tag.gettoptracks');
  url.searchParams.set('tag', tag);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', String(limit));

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Last.fm request failed: ${res.status}`);
  }

  const data = await res.json();

  if (data.error) {
    throw new Error(`Last.fm error ${data.error}: ${data.message}`);
  }

  const raw = data?.tracks?.track ?? [];

  return raw.map((track) => ({
    name: track.name,
    artist: track.artist?.name ?? 'Unknown Artist',
    url: track.url,
    // Prefer extralarge > large > medium image
    image:
      track.image?.find((i) => i.size === 'extralarge')?.['#text'] ||
      track.image?.find((i) => i.size === 'large')?.['#text'] ||
      track.image?.find((i) => i.size === 'medium')?.['#text'] ||
      '',
  }));
}
