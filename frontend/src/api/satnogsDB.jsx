const fetchTextData = async (queryParams = "") => {
    try {
        const url = `${import.meta.env.VITE_BACKSERVER_URL}/satellite/description?${queryParams}`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Station not found.`);
            } else if (response.status === 400) {
                throw new Error(`Invalid request parameters.`);
            } else {
                throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
            }
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getSatelliteDescriptionByNoradId = (id) => {
    return fetchTextData(`id=${id}`);
}
