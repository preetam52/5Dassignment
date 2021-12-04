import axios from 'axios';
import { authRoutes } from '../apis/auth.api';
import { getUrl } from '../apis/endPoints';

export const signin = async (credentials) => {
    return await axios.post(getUrl(authRoutes.signin), credentials)
}

export const signup = async (user) => {
    return await axios.post(getUrl(authRoutes.signup), {user})
}
