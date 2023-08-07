export async function fetchData({ url, dataExtractor }) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`This is an HTTP error: The status is ${response.status}`);
  return dataExtractor(await response.json());
}

export default async function customFetch({
  setLoading,
  setData,
  setError,
  cache,
  url,
  dataExtractor,
}) {
  try {
    setData(null);
    setLoading(true);
    if (!cache.has(url)) {
      const data = await fetchData({ url, dataExtractor });
      cache.set(url, data);
      setData(data);
    } else {
      setData(cache.get(url));
    }
    setError(null);
  } catch (error) {
    setData(null);
    setError(error);
  } finally {
    setLoading(false);
  }
}
