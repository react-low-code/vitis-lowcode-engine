import React from 'react'
import { SetterCommonProps } from 'vitis-lowcode-types'
import { InputNumber } from 'antd';

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: number | undefined;
    onChange?: (val?: number) => void;
    step?: number
}


function NumberSetter(props: Props) {
    const onChange = (value: number | null) => {
        if (props.onChange) {
            props.onChange(value === null ? undefined : value)
        }
    }

    return <InputNumber value={props.value} onChange={onChange} size="small" step={props.step}/>
}

export default {
    view: NumberSetter,
    name: "NumberSetter"
}