import React, { useState,useLayoutEffect, useEffect } from "react"
import MonacoEditor from 'vitis-lowcode-monaco-editor'
import { SnippetsOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { PageSchema } from 'vitis-lowcode-types'

import '../common.less'

export default function() {
    const [active, setActive] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);
    const [schema,setSchema] = useState<PageSchema>()
    const [schemaJson,setSchemaJson] = useState<string>('')

    useLayoutEffect(() => {
        setHeight(document.body.clientHeight - 130)
    },[])

    useEffect(() => {
        if (window.VitisLowCodeEngine) {
            window.VitisLowCodeEngine.project.on(window.VitisLowCodeEngine.SCHEMA_UPDATED, () => {
                setSchema(window.VitisLowCodeEngine.project.getSchema())
            })
        }
    },[])

    useEffect(() => {
        if(active) {
            setSchemaJson(JSON.stringify(schema,undefined,2))
        }
    },[active,schema])

    const onOpenChange = () => {
        setActive(!active)
    }

    return (
        <div>
            <Popover 
                trigger="click"
                placement="rightTop"
                content={
                    <div className="pane-body">
                        <MonacoEditor language="json" value={schemaJson} options={{
                            readOnly:true,
                            height: height + 'px'
                        }}/>
                    </div>
                }
                onOpenChange={onOpenChange}
                open={active}
            >
                    <SnippetsOutlined />
            </Popover>
        </div>
        

    )
}