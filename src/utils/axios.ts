import axios from 'axios';
import { firebase } from '../guards/firebase/Firebase';

const axiosServices = axios.create({
    baseURL: document.location.origin.includes('localhost') ? 'http://localhost:8080' : 'https://capitai-rest-svc-ooioetwrbq-de.a.run.app',
});

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

const getUserToken = async () => {
    return new Promise((resolve, reject) => {
        firebase.auth().currentUser?.getIdToken().then((token) => {
            resolve(token)
        }).catch((error) => {
            reject(error)
        })
    })
}

axiosServices.interceptors.request.use(
    async (config) => {
        const token = await getUserToken();
        config.headers
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
);

export default axiosServices;
