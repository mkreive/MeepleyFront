export async function fetchCheckout(fetchUrl, requestOptions) {
    try {
        const response = await fetch(fetchUrl, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        if (response.ok) {
            const responseJson = await response.json();
            return responseJson;
        }
    } catch (err) {
        return err;
    }
}
