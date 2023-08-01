export async function fetchReviews(fetchUrl) {
    const loadedReviews = [];

    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        if (response.ok) {
            const responseJson = await response.json();
            const responseData = responseJson._embedded.reviews;

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    date: responseData[key].date,
                    userEmail: responseData[key].userEmail,
                    userName: responseData[key].userName,
                    gameId: responseData[key].gameId,
                    gameReview: responseData[key].gameReview,
                });
            }
        }
    } catch (err) {
        return err;
    }

    return loadedReviews;
}
