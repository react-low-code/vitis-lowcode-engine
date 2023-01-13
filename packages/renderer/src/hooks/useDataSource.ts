import { useEffect, useState, useContext } from 'react'
import { JSDataSource, Record } from 'vitis-lowcode-types'
import qs from 'qs';
import { AxiosResponse, AxiosError } from 'axios'
import { message } from 'antd';
import { createRequest } from '../services'
import { transformStringToFunction } from '../utils'
import { Context } from '../context'

/**
 * 解析 url，取出查询字符串中的参数，orderId 只是一个占位符，用 location.search 上的同名参数填充 orderId
 * @param url: /path/to/fetchData?id={orderId}&type=1
 * @returns 
 */
function parseUrl(url: string) {
    const queries = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    const [realUrl, searchStr] = url.split('?')
    const params: Record = {}
    if (searchStr) {
        const urlParams = qs.parse(searchStr, { ignoreQueryPrefix: true })
        for (const key of Object.keys(urlParams)) {
            // 匹配{...}
            const execResult = /^\{([\W\w]{0,}?)\}$/.exec(urlParams[key] as string)
            
            if (execResult) {
                // {orderId}
                if (execResult[1]) {
                    params[key] = queries[execResult[1]] as string
                }
            } else {
                params[key] = urlParams[key] as string
            }
        }
    }
    return {url: realUrl, params}
}

function generateRequestConfig(dataSourceConfigValue: JSDataSource['value']) {
    let { url, params } = parseUrl(dataSourceConfigValue.url)
    let requestHandler: undefined | ((data: any) => Record) = undefined
    if (dataSourceConfigValue.requestHandler) {
        requestHandler = transformStringToFunction(dataSourceConfigValue.requestHandler.value)
    }
    if (requestHandler) {
        params = requestHandler(params) || {}
    }

    return {
        url,
        method: dataSourceConfigValue.method,
        params: dataSourceConfigValue.method.toLocaleUpperCase() === 'GET' ? params: undefined,
        data: dataSourceConfigValue.method.toLocaleUpperCase() === 'POST' ? params: undefined,

    }
}

export default function useDataSource(dataSourceConfig: JSDataSource | undefined) {
    const [loading, setLoading] = useState<boolean>(() => {
        return !!dataSourceConfig
    })
    const [data, setData] = useState<object | undefined>()
    const { interceptors } = useContext(Context)

    useEffect(() => {
        if (!dataSourceConfig || !dataSourceConfig.value.url.trim()) {
            setData(undefined)
            setLoading(false)
        } else {
            setLoading(true)
            createRequest(interceptors)(generateRequestConfig(dataSourceConfig.value))
                .then(
                    (response) => {
                        let responseHandler:  (response: AxiosResponse) => any = (response) => response.data
                        if (dataSourceConfig.value.responseHandler) {
                            responseHandler = transformStringToFunction(dataSourceConfig.value.responseHandler.value) || responseHandler
                        }
                        setData(responseHandler(response))
                    }, 
                    (reason: AxiosError) => {
                        let errorHandler:  (reason: AxiosError) => void = () => {
                            message.error(reason.message || reason || '网络错误，请稍后再试')
                        }
                        if (dataSourceConfig.value.errorHandler) {
                            errorHandler = transformStringToFunction(dataSourceConfig.value.errorHandler.value) || errorHandler
                        }

                        errorHandler(reason)
                    }
                )
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [dataSourceConfig])

    return {loading, data}
}