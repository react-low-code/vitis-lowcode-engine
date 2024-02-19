import React, { useState, useLayoutEffect, useRef } from "react"
import { LifeCycles } from 'vitis-lowcode-types'
import cn from 'classnames'
import { Popover, Button } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import MonacoEditor from 'vitis-lowcode-monaco-editor'

import './index.less'

export default function () {
    const [active, setActive] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);
    const [ lifeCycles, setLifeCycles ] = useState<LifeCycles>(() => {
        if (window.VitisLowCodeEngine) {
            return window.VitisLowCodeEngine.project.getLifeCycles()
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

    const onChange = (name: keyof LifeCycles) => (value: string) => {
        if (window.VitisLowCodeEngine) {
            window.VitisLowCodeEngine.project.updateLifeCycles(name, {
                type: 'JSFunction',
                value
            })
        }
    }

    const onAddLifeCycle = (name: keyof LifeCycles) => () => {
        setLifeCycles({
            ...lifeCycles,
            [name]: {
                type: 'JSFunction',
                value: `function on${name}() {/** todo*/ }`
            }
        })
    } 

    return (
        <div className='lifeCycles-pane'>
            <Popover 
                trigger="click"
                placement="rightTop"
                
                content={
                <div className='components-pane-body' style={{height: height + 'px'}}>
                    <div>
                        <div>应用加载之后</div>
                        {lifeCycles.load !== undefined ? 
                        <MonacoEditor value={lifeCycles.load.value} language="javascript" onBlur={onChange('load')} />: 
                        <Button type="dashed" size="small" onClick={onAddLifeCycle('load')}>添加</Button>
                        }
                    </div>
                    <div>
                        <div>应用卸载之前</div>
                        {lifeCycles.beforeunload !== undefined ? 
                        <MonacoEditor value={lifeCycles.beforeunload.value} language="javascript" onBlur={onChange('beforeunload')} />: 
                        <Button type="dashed" size="small" onClick={onAddLifeCycle("beforeunload")}>添加</Button>
                        }
                    </div>
                    <div>
                        <div>应用卸载之后</div>
                        {lifeCycles.unload !== undefined ? 
                        <MonacoEditor value={lifeCycles.unload.value} language="javascript" onBlur={onChange('unload')} />: 
                        <Button type="dashed" size="small" onClick={onAddLifeCycle("unload")}>添加</Button>
                        }
                    </div>
                    <div>
                        <div>应用可见性变化时</div>
                        {lifeCycles.visibilitychange !== undefined ? 
                        <MonacoEditor value={lifeCycles.visibilitychange.value} language="javascript" onBlur={onChange('visibilitychange')} />: 
                        <Button type="dashed" size="small" onClick={onAddLifeCycle("visibilitychange")}>添加</Button>
                        }
                    </div>
                </div>
                }
                onOpenChange={onOpenChange}
                open={active}
            >
                <FormOutlined className={cn({icon: true, active: active})}/>
            </Popover>
        </div>
    )
}