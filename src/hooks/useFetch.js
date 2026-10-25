import { useCallback, useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function useFetch(path) {
    const url = BASE_URL + path;

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loadedUrl, setLoadedUrl] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(url, {
            signal: abortController.signal,
            headers: {
                'apiKey': import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                // A malformed id in the URL (not a valid uuid) gets a 400 - handle it the same as "not found"
                if (res.status === 400) {
                    return [];
                }

                if (!res.ok) {
                    throw new Error(`Request failed: ${res.status}`);
                }

                return res.json();
            })
            .then(result => {
                setData(result);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    return;
                }

                setError(err.message);
            })
            .finally(() => {
                if (!abortController.signal.aborted) {
                    setLoadedUrl(url);
                }
            });

        return () => {
            abortController.abort();
        }
    }, [url, refreshKey]);

    const refetch = useCallback(() => setRefreshKey(key => key + 1), []);

    return { data, isLoading: loadedUrl !== url, error, refetch };
}
