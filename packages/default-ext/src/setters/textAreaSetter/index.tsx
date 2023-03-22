import React from 'react'
import { SetterCommonProps } from 'vitis-lowcode-types'
import { Input } from 'antd'

const { TextArea } = Input;

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: string
}


function TextAreaSetter(props: Props) {
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (props.onChange) {
            props.onChange(event.target.value)
        }
    }

    return <TextArea 
            rows={2} 
            autoSize={true} 
            value={props.value} 
            onChange={onChange}
            size="small"
        />
}

export default {
    view: TextAreaSetter,
    name: "TextAreaSetter"
}