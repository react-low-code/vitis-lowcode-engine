import React,{ useState } from 'react'
import { SetterCommonProps, JSFunction } from 'vitis-lowcode-types'
import MonacoEditor from 'vitis-lowcode-monaco-editor'
import { Button, Modal } from 'antd'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: JSFunction | undefined;
    onChange?: (value: JSFunction) => void;
    isUnfold?: boolean
}


function FunctionSetter(props: Props) {
    const [isUnfold, setIsUnfold] = useState(props.isUnfold || false)
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

    if(!isUnfold) {
        return <Button type="dashed" size="small" onClick={() => setIsUnfold(true)}>最大化</Button>
    }

    return (
        <Modal 
            open={isUnfold} 
            width={700}
            title={props.field.title}
            footer={[
                <Button 
                    key="back" 
                    onClick={() => setIsUnfold(false)}
                    size="small"
                >
                    最小化
                </Button>
            ]}
            onCancel={() => setIsUnfold(false)}
        >
            <MonacoEditor language='javascript' value={props.value.value} onBlur={onChange}/>
        </Modal>
    )
}

export default {
    view: FunctionSetter,
    name: "FunctionSetter"
}