import React from 'react'
import { SetterCommonProps } from 'vitis-lowcode-types'
import { Radio, RadioChangeEvent } from 'antd'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    options?: {label: string; value: string}[];
    value: string
}


function RadioGroupSetter(props: Props) {
    const onChange = (event: RadioChangeEvent) => {
        if (props.onChange) {
            props.onChange(event.target.value)
        }
    }

    return (
        <Radio.Group value={props.value} onChange={onChange}>
            {(props.options || []).map(option => (<Radio value={option.value} key={option.value}>{option.label}</Radio>))}
        </Radio.Group>
    )
}

export default {
    view: RadioGroupSetter,
    name: "RadioGroupSetter"
}