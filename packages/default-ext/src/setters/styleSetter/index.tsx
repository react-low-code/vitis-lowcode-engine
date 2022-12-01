import React from 'react'
import { SetterCommonProps } from 'vitis-lowcode-types'
import Background from './background'

interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: React.CSSProperties
    [attr: string]: any;
}

function StyleSetter(props: Props) {
    const onChange = (name: string) => (value?: string | number) => {
        // todo
    }

    return (
        <div>
            <Background 
                background={props.value.backgroundColor || props.value.background} 
                onChange={onChange('background')}
            />
        </div>
    )
}

export default {
    view: StyleSetter,
    name: "StyleSetter"
}

