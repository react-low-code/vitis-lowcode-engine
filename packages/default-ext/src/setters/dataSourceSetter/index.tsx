import React from 'react'
import { SetterCommonProps,JSDataSource, JSFunction } from 'vitis-lowcode-types'
import { Input } from 'antd';
import { Radio, RadioChangeEvent } from 'antd'
import MonacoEditorModel from '../_commpents/MonacoEditorModel'
import './index.less';


export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: JSDataSource | undefined;
    onChange?: (val?: JSDataSource) => void;
}


function DataSourceSetter(props: Props) {
    const dataSourceVal = (props.value?.value || {
        url: '',
        method: 'GET'
    })
    const url = dataSourceVal.url
    const method = dataSourceVal.method
    const requestHandlerVal = dataSourceVal.requestHandler?.value || ''
    const responseHandlerVal = dataSourceVal.responseHandler?.value || ''

    const onChange = (key: keyof JSDataSource['value'], val:string | JSFunction) => {
        if(props.onChange) {
            props.onChange({
                type: 'DataSource',
                value: {
                    ...dataSourceVal,
                    [key]: val
                }
            })
        }
    }

    const onChangeUrl = (e:React.ChangeEvent<HTMLInputElement>) => {
        onChange('url',e.target.value)
    }

    const onChangeMethod = (e:RadioChangeEvent) => {
        onChange('method',e.target.value)
    }

    const onChangeHandler = (key: 'requestHandler' | 'responseHandler',value: string) => {
        onChange(key, {
            type: 'JSFunction',
            value
        })
    }

    return (
        <div>
            <div className='data-Source-row'>
                <span className='data-Source-body red'>这里的配置将发送网络请求</span>
            </div>
            <div className='data-Source-row'>
                <span className='data-Source-label'>
                    URL
                    <span className='star'>*</span>
                </span>
                <span className='data-Source-body'>
                    <Input size="small" value={url} onChange={onChangeUrl}/>
                </span>
            </div>

            <div className='data-Source-row'>
                <span className='data-Source-label'>
                    请求方式
                    <span className='star'>*</span>
                </span>
                <span className='data-Source-body'>
                    <Radio.Group  size="small" value={method} onChange={onChangeMethod}>
                        <Radio value='GET' key='GET'>GET</Radio>
                        <Radio value='POST' key='POST'>POST</Radio>
                    </Radio.Group>
                </span>
            </div>
            <div className='data-Source-row'>
                <span className='data-Source-label'>请求处理器</span>
                <span className='data-Source-body'>
                    <MonacoEditorModel 
                        language="javascript" 
                        isUnfold={false} 
                        title='请求处理器' 
                        value={requestHandlerVal} 
                        onChange={(v: string) => onChangeHandler('requestHandler',v)}
                    />
                </span>
            </div>
            
            <div className='data-Source-row'>
                <span className='data-Source-label'>响应处理器</span>
                <span className='data-Source-body'>
                    <MonacoEditorModel 
                        language="javascript" 
                        isUnfold={false} 
                        title='响应处理器' 
                        value={responseHandlerVal} 
                        onChange={(v: string) => onChangeHandler('responseHandler',v)}
                    />
                </span>
            </div>
        </div>
    )
}

export default {
    view: DataSourceSetter,
    name: "DataSourceSetter"
}