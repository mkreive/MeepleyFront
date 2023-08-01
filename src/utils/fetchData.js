export async function fetchData(fetchUrl) {
    let loadedData = {};
    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        if (response.ok) {
            const responseJson = await response.json();
            loadedData = responseJson;
        }
    } catch (err) {
        return err;
    }

    return loadedData;
}
