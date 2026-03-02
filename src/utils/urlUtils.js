import axios from "axios";

export const getCountryFromIP = async (ip) => {
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}/json`);
        return response.data.country || null;
    } catch (error) {
        return null;
    }
};