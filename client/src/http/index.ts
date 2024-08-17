import axios from 'axios'
import { type IAuthResponse } from '../models/accountAuth'

const { VITE_API_URL } = import.meta.env
const $api = axios.create({
    baseURL: VITE_API_URL,
    // withCredentials: true, //! CORS error
})

$api.interceptors.request.use(config => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem(
        'token-access',
    )}`
    // config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${localStorage.getItem('token-access')}`,
    // }
    return config
})

$api.interceptors.response.use(
    config => {
        return config
    },
    async error => {
        const originalRequest = error.config
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                const response = await axios.post<IAuthResponse>(
                    `${VITE_API_URL}account/refresh-token/`,
                    {
                        refresh: localStorage.getItem('token-refresh'),
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem(
                                'token-access',
                            )}`,
                        },
                    },
                )
                localStorage.setItem('token-access', response.data.access)
                localStorage.setItem('token-refresh', response.data.refresh)
                return $api.request(originalRequest)
            } catch (e) {
                // if (e instanceof DOMException && e.name === 'AbortError') {
                //     console.log(e.message)
                // }
                console.log(e)
            }
        }
        // console.log(error)
        // return error
        throw error
    },
)

export default $api
