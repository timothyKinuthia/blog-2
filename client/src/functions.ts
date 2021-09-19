import axios from 'axios';

export const postDataApi = async (url: string, post: object, token?: string) => {
    return await axios.post(`/api/${url}`, post, {
        headers: {
            Authorization: token
        }
    })
};

export const getDataApi = async (url: string, token?: string) => {
    return await axios.get(`/api/${url}`, {
        headers: {
            Authorization: token
        }
    })
};