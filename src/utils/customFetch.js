export default async function customFetch({
  setLoading,
  setData,
  setError,
  cache,
  url,
  dataExtractor,
  callback,
  cleanup,
}) {
  try {
    setData(null);
    setLoading(true);
    if (!cache.has(url)) {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      const data = dataExtractor(await response.json());

      cache.set(url, data);
      setData(data);

      if (callback) callback(data);
    } else {
      setData(cache.get(url));
    }
    setError(null);
  } catch (error) {
    setData(null);
    setError(error);
  } finally {
    setLoading(false);
    if (cleanup) cleanup();
  }
}
