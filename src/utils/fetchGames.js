export async function fetchGames(fetchUrl) {
    const loadedGames = [];

    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        if (response.ok) {
            const responseJson = await response.json();
            const responseData = responseJson._embedded.games;

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
                    complexity: responseData[key].complexity,
                    players: responseData[key].players,
                    playingTime: responseData[key].playingTime,
                    img: responseData[key].img,
                });
            }
        }
    } catch (err) {
        return err;
    }

    return loadedGames;
}
