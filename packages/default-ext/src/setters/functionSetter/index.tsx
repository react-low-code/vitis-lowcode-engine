import React from 'react'
import { SetterCommonProps, JSFunction } from 'vitis-lowcode-types'
import MonacoEditorModel from '../_commpents/MonacoEditorModel'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: JSFunction | undefined;
    onChange?: (value: JSFunction) => void;
    isUnfold?: boolean
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

    if (!props.value) {
        return null
    }

    return <MonacoEditorModel 
        isUnfold={props.isUnfold} 
        language='javascript' 
        value={props.value.value} 
        onChange={onChange} 
        title={props.field.title}
        />

}

export default {
    view: FunctionSetter,
    name: "FunctionSetter"
}