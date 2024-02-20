import React, { useState, useLayoutEffect } from "react"
import { Interceptors } from 'vitis-lowcode-types'
import cn from 'classnames'
import { Popover, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import MonacoEditor from 'vitis-lowcode-monaco-editor'

import './index.less'
import '../common.less'

const defaultConfig = {
    request: {
        commit: `
        /**
           * axios 请求拦截器
           * @param config: AxiosRequestConfig
           * @returns: AxiosRequestConfig
        */
        `,
        body: `
        function requestInterceptor(config) {
            const token = localStorage.getItem('token')
            if (token) {
                if (!config.headers) {
                    config.headers = {}
                }
                config.headers.authorization = token;
            }
            return config;
        }
        `
    },
    response: {
        commit: `
        /**
            * axios 响应拦截器
            * @param responseData: AxiosResponse['data']
            * @returns: thenable | non-thenable
        */
        `,
        body: `
        function responseInterceptor(responseData){ 
            if (responseData.code !== '0') {
                return Promise.reject(responseData.msg)
            } else {
                if (responseData.data.token) {
                    localStorage.setItem('token', responseData.data.token)
                }
                return responseData.data
            }
        }
        `
    }
}

export default function () {
    const [active, setActive] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);
    const [ interceptors, setInterceptors ] = useState<Interceptors>(() => {
        if (window.VitisLowCodeEngine) {
            return window.VitisLowCodeEngine.project.getInterceptors()
        } else {
            return {}
        }
    });

    useLayoutEffect(() => {
        setHeight(document.body.clientHeight - 130)
    },[])

    const onOpenChange = () => {
        setActive(!active)
    }

    const onChange = (name: keyof Interceptors) => (value: string) => {
        if (window.VitisLowCodeEngine) {
            window.VitisLowCodeEngine.project.updateInterceptors(name, {
                type: 'JSFunction',
                value
            })
        }
    }

    const onAddLifeCycle = (name: keyof Interceptors) => () => {
        setInterceptors({
            ...interceptors,
            [name]: {
                type: 'JSFunction',
                value: `
                ${defaultConfig[name].commit}
                ${defaultConfig[name].body}
                `
            }
        })
    } 

    return (
        <div className='NetworkInterceptorsPane'>
            <Popover 
                trigger="click"
                placement="rightTop"
                content={
                <div className='pane-body' style={{height: height + 'px'}}>
                    <div>
                        <div>请求拦截器</div>
                        {interceptors.request !== undefined ? 
                        <MonacoEditor value={interceptors.request.value} language="javascript" onBlur={onChange('request')} />: 
                        <Button type="dashed" size="small" onClick={onAddLifeCycle('request')}>添加</Button>
                        }
                    </div>
                    <div>
                        <div>响应拦截器</div>
                        {interceptors.response !== undefined ? 
                        <MonacoEditor value={interceptors.response.value} language="javascript" onBlur={onChange('response')} />: 
                        <Button type="dashed" size="small" onClick={onAddLifeCycle("response")}>添加</Button>
                        }
                    </div>
                </div>
                }
                onOpenChange={onOpenChange}
                open={active}
            >
                <ClockCircleOutlined className={cn({icon: true, active: active})}/>
            </Popover>
        </div>
    )
}