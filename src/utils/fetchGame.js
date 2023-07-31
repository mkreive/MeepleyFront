export async function fetchGame(fetchUrl) {
    let game = {};

    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        if (response.ok) {
            const responseJson = await response.json();

            game = {
                id: responseJson.id,
                title: responseJson.title,
                designer: responseJson.designer,
                publisher: responseJson.publisher,
                intro: responseJson.intro,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                complexity: responseJson.complexity,
                players: responseJson.players,
                playingTime: responseJson.playingTime,
                img: responseJson.img,
            };
        }
    } catch (err) {
        return err;
    }

    return game;
}
