import React, { useState, useEffect } from 'react';

export function useFetchGames(fetchUrl) {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async function () {
            try {
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                if (response.ok) {
                    const responseJson = await response.json();
                    const responseData = responseJson._embedded.games;
                    const loadedGames = [];

                    for (const key in responseData) {
                        loadedGames.push({
                            id: responseData[key].id,
                            title: responseData[key].title,
                            designer: responseData[key].designer,
                            publisher: responseData[key].publisher,
                            intro: responseData[key].intro,
                            description: responseData[key].description,
                            copies: responseData[key].copies,
                            copiesAvailable: responseData[key].copiesAvailable,
                            category: responseData[key].category,
                            players: responseData[key].players,
                            playingTime: responseData[key].playingTime,
                            img: responseData[key].img,
                        });
                    }
                    setGames(loadedGames.reverse());
                    setLoading(false);
                    setError(false);
                }
            } catch (err) {
                setError(err);
                setGames(null);
                setLoading(true);
            }
        };
        fetchData();
    }, [setLoading, setGames, setError]);

    return { loading, games, error };
}
