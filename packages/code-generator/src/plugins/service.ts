import { CodeStruct, FileType, ChunkType, ChunkName } from '../types'

export default function plugin(struct: CodeStruct) {
    const input = struct.input
    const interceptors = input.schema.interceptors

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TS,
        chunkName: ChunkName.ImportExternalJSModules,
        content: `import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'`,
        linkAfter: []
    })

    function generateRequestInterceptor() {
        if (interceptors && interceptors.request) {
            const config = interceptors.request.value ? `
            const requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig = ${interceptors.request.value}
            return requestInterceptor(config)`: 'return config'

            return `instance.interceptors.request.use(function(config: AxiosRequestConfig): AxiosRequestConfig {
                ${config}
            })`
        } else {
            return ''
        }
    }
    function generateResponseInterceptor() {
        if (interceptors && interceptors.response) {
            const response = interceptors.response.value ? `const responseInterceptor: (responseData: AxiosResponse['data']) => AxiosResponse['data'] = ${interceptors.response.value}
            try {
                const data = await responseInterceptor(value.data)
                return {...value, data}
            } catch (error) {
                return Promise.reject(error)
            }` : 'return value'
            

            return `instance.interceptors.response.use(async function(value: AxiosResponse<any, any>): Promise<AxiosResponse<any, any>> {
                ${response}
            })`
        } else {
            return ''
        }
    }

    struct.chunks.push({
        chunkType: ChunkType.STRING,
        fileType: FileType.TS,
        chunkName: ChunkName.FileMainContent,
        content: `const instance = axios.create({
            responseType: "json"
        })
        ${generateRequestInterceptor()}
        ${generateResponseInterceptor()}
        export default instance
        `,
        linkAfter: [ChunkName.ImportExternalJSModules]
    })
    return struct
}