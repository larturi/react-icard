export const fetchData = async (url, params = null) => {
    if (params) {
        let result = await fetch(url, params);
        return result;
    } else {
        let result = await fetch(url);
        return result;
    }
};