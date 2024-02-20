import React, { useLayoutEffect, useState } from 'react'
import { SetterCommonProps, JSFunction } from 'vitis-lowcode-types'
import MonacoEditorModel from '../_commpents/MonacoEditorModel'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: string | undefined | object;
    onChange?: (value: JSFunction) => void
    isUnfold?: boolean
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

    return <MonacoEditorModel 
        isUnfold={props.isUnfold} 
        language='json' 
        value={value} 
        onChange={onChange} 
        title={props.field.title}
        />
}

export default {
    view: JsonSetter,
    name: "JsonSetter"
}