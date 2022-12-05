import React from 'react'
import { SetterCommonProps, JSFunction } from 'vitis-lowcode-types'
import MonacoEditor from 'vitis-lowcode-monaco-editor'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: JSFunction;
    onChange?: (value: JSFunction) => void
}


function FunctionSetter(props: Props) {
    const onChange = (value: string) => {
        if (props.onChange) {
            props.onChange({
                type: 'JSFunction',
                value
            })
        }
    }

    return (
        <MonacoEditor language='javascript' value={props.value.value} onBlur={onChange}/>
    )
}

export default {
    view: FunctionSetter,
    name: "FunctionSetter"
}