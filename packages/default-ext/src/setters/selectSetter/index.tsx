import React from 'react'
import { SetterCommonProps } from 'vitis-lowcode-types'
import { Select } from 'antd'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    options?: {label: string; value: string}[];
    value: string
}


function SelectSetter(props: Props) {
    const onChange = (value: string) => {
        if (props.onChange) {
            props.onChange(value)
        }
    }

    return (
        <Select 
            value={props.value} 
            onChange={onChange}
            options={props.options}
            size="small"
        />
    )
}

export default {
    view: SelectSetter,
    name: "SelectSetter"
}