/**
 * Store data to localstorage.
 * @param {*} key 
 * @param {*} value 
 * @returns 
 */
export const setData = (key: string, value: any) => {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
    return value;
}

/**
 * Retrive data from localstorage
 * @param {*} key 
 * @returns 
 */
export const getData = (key: string) => {
    const data = localStorage.getItem(key);

    if(data) {
        return JSON.parse(data);
    } else {
        return null;
    }
}

/**
 * Remove all data from localstorage
 * @returns 
 */
export const removeAllData = () => {
    localStorage.clear();
    return null;
}

/**
 * Remove data from localstorage
 * @param {*} key 
 * @returns 
 */
export const removeData = (key: string) => {
    localStorage.removeItem(key);
    return null;
}