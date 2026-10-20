import { useCallback, useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function useFetch(path) {
    const url = BASE_URL + path;

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    // Loading = the current url hasn't finished yet. A refetch keeps the old data on screen instead of showing the spinner again
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
                // 400 = an id filter got something that isn't a valid uuid, so treat it like "nothing found"
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
                // Aborted on unmount / url change (or StrictMode's dev remount) — not a real error
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
