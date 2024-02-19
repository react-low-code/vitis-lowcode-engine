import React, { useLayoutEffect, useState } from 'react'
import { SetterCommonProps, JSFunction } from 'vitis-lowcode-types'
import MonacoEditor from 'vitis-lowcode-monaco-editor'
import { Button, Modal } from 'antd'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: string | undefined | object;
    onChange?: (value: JSFunction) => void
    isUnfold?: boolean
}


function JsonSetter(props: Props) {
    const [value, setValue] = useState<string>('')
    const [isUnfold, setIsUnfold] = useState(props.isUnfold || false)
    const onChange = (value: string) => {
        if (props.onChange) {
            let newVal = undefined
            try {
                newVal = typeof props.value === 'object' ? JSON.parse(value): value
            } catch (error) {
                console.error(error)
            }
            props.onChange(newVal)
        }
    }
    useLayoutEffect(() => {
        if (props.value && typeof props.value === 'object') {
            setValue(JSON.stringify(props.value,null,2))
        } else {
            setValue(props.value || '')
        }
    }, [props.value])

    if(!isUnfold) {
        return <Button type="dashed" size="small" onClick={() => setIsUnfold(true)}>最大化</Button>
    }

    return (
        <Modal 
            open={isUnfold} 
            width={700}
            title={props.field.title}
            footer={[
                <Button 
                    key="back" 
                    onClick={() => setIsUnfold(false)}
                    size="small"
                >
                    最小化
                </Button>
            ]}
            onCancel={() => setIsUnfold(false)}
        >
            <MonacoEditor language='json' value={value} onBlur={onChange}/>
        </Modal>
    )
}

export default {
    view: JsonSetter,
    name: "JsonSetter"
}