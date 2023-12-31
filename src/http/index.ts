import axios from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";
import { handleErrorMessage } from "../redux/actions";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export const API_URL = `https://annarchive.ru/api`;
export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
            Cookies.set("token", response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            const dispatch = useDispatch();
            dispatch(handleErrorMessage('Пользователь не авторизован'));
        }
    }
    throw error;
})

export default $api;