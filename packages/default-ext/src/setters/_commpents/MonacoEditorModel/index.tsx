import React, { useState } from 'react'
import MonacoEditor from 'vitis-lowcode-monaco-editor'
import { Button, Modal } from 'antd'

interface Props {
    isUnfold?: boolean
    title?: string
    value: string
    onChange: ( value: string) => void
    language: string
}
export default function(props: Props) {
    const [isUnfold, setIsUnfold] = useState(props.isUnfold || false)

    if(!isUnfold) {
        return <Button type="dashed" size="small" onClick={() => setIsUnfold(true)}>最大化</Button>
    }

    return (
        <Modal 
            open={isUnfold} 
            width={700}
            title={props.title}
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
            <MonacoEditor language={props.language} value={props.value} onBlur={props.onChange}/>
        </Modal>
    )
}