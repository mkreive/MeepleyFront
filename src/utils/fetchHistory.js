export async function fetchHistory(fetchUrl, options = {}) {
    try {
        const response = await fetch(fetchUrl, options);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        if (response.ok) {
            const responseJson = await response.json();
            const responseData = responseJson._embedded.histories;
            return responseData;
        }
    } catch (err) {
        return err;
    }
}
