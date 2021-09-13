import axios from 'axios';

export const postDataApi = async (url: string, post: object, token?: string) => {
    return await axios.post(`/api/${url}`, post, {
        headers: {
            Authorization: token
        }
    })
};