import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { PageSchema } from 'vitis-lowcode-types'
import { transformStringToFunction } from '../utils'

const axiosInstance = axios.create({
    // withCredentials: true,
    responseType: "json"
})

export const request = axiosInstance.request

export function createRequest(interceptors: PageSchema['interceptors']) {
    const instance = axios.create({
        // withCredentials: true,
        responseType: "json"
    })
    if (interceptors) {
        instance.interceptors.request.use(function(config: AxiosRequestConfig): AxiosRequestConfig {
            if (interceptors && interceptors.request) {
                const requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig = transformStringToFunction(interceptors.request.value)
                return requestInterceptor(config)
            }
            return config
        })
        instance.interceptors.response.use(async function(value: AxiosResponse<any, any>): Promise<AxiosResponse<any, any>> {
            let data = value.data
            if (interceptors && interceptors.response) {
                const responseInterceptor: (responseData: AxiosResponse['data']) => AxiosResponse['data'] = transformStringToFunction(interceptors.response.value)
                data = await responseInterceptor(data)
            }

            return {
                ...value,
                data
            }
        })
    }
    return instance
}