import React from 'react'
import { SetterCommonProps } from 'vitis-lowcode-types'
import { Radio, RadioChangeEvent } from 'antd'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: boolean
}


function BoolSetter(props: Props) {
    const onChange = (event: RadioChangeEvent) => {
        if (props.onChange) {
            props.onChange(event.target.value)
        }
    }

    return (
        <Radio.Group 
            value={props.value} 
            onChange={onChange}
            size="small"
        >
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
        </Radio.Group>
    )
}

export default {
    view: BoolSetter,
    name: "BoolSetter"
}