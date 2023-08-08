export async function fetchMessages(fetchUrl, options = {}) {
    console.log(fetchUrl);
    try {
        const response = await fetch(fetchUrl, options);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        if (response.ok) {
            const responseJson = await response.json();
            const responseData = responseJson._embedded.messages;
            return responseData;
        }
    } catch (err) {
        return err;
    }
}
