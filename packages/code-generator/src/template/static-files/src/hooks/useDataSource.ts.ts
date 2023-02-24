import { ResultFile } from '../../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [['src','hooks'], {
        name: 'useDataSource',
        ext: 'ts',
        content: `
        import { useEffect, useState } from 'react'
import qs from 'qs';
import { Path } from 'depath'
import { AxiosResponse, AxiosError } from 'axios'
import { message } from 'antd';
import instanceAxios from '../service'
import { ContainerDataContextSpec } from '../context'
import { DataSourceConfig } from '../types'

/**
 * 解析 url，取出查询字符串中的参数，orderId 只是一个占位符，用 location.search 上的同名参数填充 orderId
 * @param url: /path/to/fetchData?id={orderId}&type=1
 * @returns 
 */
function parseUrl(url: string) {
    const queries = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    const [realUrl, searchStr] = url.split('?')
    const params: {[attr: string]: string | undefined | number} = {}
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

function generateRequestConfig(dataSourceConfig: DataSourceConfig) {
    let { url, params } = parseUrl(dataSourceConfig.url)
    if (dataSourceConfig.requestHandler) {
        params = dataSourceConfig.requestHandler(params) || {}
    }

    return {
        url,
        method: dataSourceConfig.method,
        params: dataSourceConfig.method.toLocaleUpperCase() === 'GET' ? params: undefined,
        data: dataSourceConfig.method.toLocaleUpperCase() === 'POST' ? params: undefined,

    }
}

/**
 * 为容器类组件获取数据源，组件只能从当前容器获取数据
 * @param dataSourceConfig 通过网络请求获取数据源
 * @param pathToVal 从所属容器中获取数据源
 * @param containerData 所属容器的数据源
 * @returns 
 */
export default function useDataSource(dataSourceConfig?: DataSourceConfig, pathToVal?: string, containerData?: ContainerDataContextSpec['data']) {
    const [loading, setLoading] = useState<boolean>(() => {
        return !!dataSourceConfig
    })
    const [data, setData] = useState<ContainerDataContextSpec['data']>()

    useEffect(() => {
        // 当不需要发网络请求取数据时，从所属容器中取数据
        if (!dataSourceConfig || !dataSourceConfig.url.trim()) {
            setLoading(false)
            // 透传所属容器的数据源
            if (!pathToVal || !pathToVal.trim()) { 
                setData(containerData) 
            } else {
                return setData(Path.getIn(containerData, pathToVal))
            }
        } else {
            setLoading(true)
            instanceAxios.request(generateRequestConfig(dataSourceConfig))
                .then(
                    (response: AxiosResponse) => {
                        const responseHandler = dataSourceConfig.responseHandler || function (response){return response.data} 
                        setData(responseHandler(response))
                    }, 
                    (reason: AxiosError) => {
                        let errorHandler:  (reason: AxiosError) => void = dataSourceConfig.errorHandler || function () {
                            message.error(reason.message || reason || '网络错误，请稍后再试')
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
        `
    }]
}

