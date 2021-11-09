export const fetchData = async (url, params = null) => {
    const response = await fetch(url, params);
    return response;
};