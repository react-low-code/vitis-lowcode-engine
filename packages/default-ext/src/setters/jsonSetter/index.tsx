import React, { useLayoutEffect, useState } from 'react'
import { SetterCommonProps, JSFunction } from 'vitis-lowcode-types'
import MonacoEditor from 'vitis-lowcode-monaco-editor'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: string | undefined | object;
    onChange?: (value: JSFunction) => void
}


function JsonSetter(props: Props) {
    const [value, setValue] = useState<string>('')
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
    return (
        <MonacoEditor language='json' value={value} onBlur={onChange}/>
    )
}

export default {
    view: JsonSetter,
    name: "JsonSetter"
}