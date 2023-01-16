import { useEffect, useState, useContext } from 'react'
import { JSDataSource, Record } from 'vitis-lowcode-types'
import qs from 'qs';
import { Path } from 'depath'
import { AxiosResponse, AxiosError } from 'axios'
import { message } from 'antd';
import { createRequest } from '../services'
import { transformStringToFunction } from '../utils'
import { PropsContext, ContainerDataContextSpec } from '../context'

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

/**
 * 为容器类组件获取数据源，组件只能从当前容器获取数据
 * @param dataSourceConfig 通过网络请求获取数据源
 * @param pathToVal 从所属容器中获取数据源
 * @param containerData 所属容器的数据源
 * @returns 
 */
export default function useDataSource(dataSourceConfig?: JSDataSource, pathToVal?: string, containerData?: ContainerDataContextSpec['data']) {
    const [loading, setLoading] = useState<boolean>(() => {
        return !!dataSourceConfig
    })
    const [data, setData] = useState<ContainerDataContextSpec['data']>()
    const { interceptors } = useContext(PropsContext)

    useEffect(() => {
        // 当不需要发网络请求取数据时，从所属容器中取数据
        if (!dataSourceConfig || !dataSourceConfig.value.url.trim()) {
            setLoading(false)
            // 透传所属容器的数据源
            if (!pathToVal || !pathToVal.trim()) { 
                setData(containerData) 
            } else {
                return setData(Path.getIn(containerData, pathToVal))
            }
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
    }, [dataSourceConfig, pathToVal, containerData])

    return {loading, data}
}
