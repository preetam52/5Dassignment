import axios from 'axios';
import { momentRoutes } from '../apis/moment.api';
import { getUrl } from '../apis/endPoints';

export const getMoments = async (userid, page, limit) => {
    console.log(userid, page, limit);
    const response = await axios.get(`${getUrl(momentRoutes.get)}?page=${page}&limit=${limit}`, {headers: {userid}})
    return response?.data?.moments?.docs
}

export const createMoment = async (moment) => {
    const formData = new FormData();
    if(moment?.image?.length) {
        for (let i = 0 ; i < moment.image.length ; i++) {
            formData.append("image", moment.image[i]);
        }
        formData.append('title', moment.title);
        formData.append('tags', moment.tags);
        formData.append('userId', moment.userId);

    }
    return await axios.post(getUrl(momentRoutes.create), formData)
    
}

export const deleteMoment = async (momentId) => {
    console.log({momentId});
    return await axios.post(getUrl(momentRoutes.delete),{momentId})
}
