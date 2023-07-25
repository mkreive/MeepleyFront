import { useState, useEffect } from 'react';

export function useFetchData(fetchUrl) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async function () {
            try {
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const responseData = await response.json();
                if (response.ok) {
                    setData(responseData);
                    setLoading(false);
                    setError(false);
                }
            } catch (err) {
                setError(err);
                setData(null);
                setLoading(true);
            }
        };
        fetchData();
    }, [setLoading, setData, setError]);

    return { loading, data, error };
}
