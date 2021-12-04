import axios from 'axios';
import { momentRoutes } from '../apis/moment.api';
import { getUrl } from '../apis/endPoints';

export const getMoments = async ({userId, page, limit}) => {
    await axios.get(`${getUrl(momentRoutes.get)}&page=${page}&limit=${limit}`, {headers: {userId}})
}

export const createMoment = async ({moment}) => {
    await axios.post(getUrl(momentRoutes.signin, user))
}
