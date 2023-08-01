import React, { useState, useEffect } from 'react';
import { fetchGame } from '../utils/fetchGame';

export function useFetchReviews(fetchUrl) {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(false);
    const [game, setGame] = useState({});

    useEffect(() => {
        const fetchData = async function () {
            try {
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                if (response.ok) {
                    const responseJson = await response.json();
                    const responseData = responseJson._embedded.reviews;
                    const loadedReviews = [];

                    for (const key in responseData) {
                        const getGame = async function () {
                            const game = await fetchGame(`/api/games/${responseData[key].gameId}`);

                            if (game) {
                                loadedReviews.push({
                                    id: responseData[key].id,
                                    userEmail: responseData[key].userEmail,
                                    userName: responseData[key].userName,
                                    gameId: responseData[key].gameId,
                                    gameReview: responseData[key].gameReview,
                                    gameName: game.title,
                                });
                            } else {
                                setError(game);
                            }
                        };
                        getGame();
                    }
                    setReviews(loadedReviews.reverse());
                    setLoading(false);
                    setError(false);
                }
            } catch (err) {
                setError(err);
                setReviews(null);
                setLoading(true);
            }
        };
        fetchData();
    }, [setLoading, setReviews, setError]);

    return { loading, reviews, error };
}
