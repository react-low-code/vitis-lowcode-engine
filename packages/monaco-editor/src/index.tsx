import { useEditor, EditorConfig } from './helper'
import React, { useEffect } from 'react'
import { Spin } from 'antd'

interface Props extends EditorConfig {
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void
}

export default function MonacoEditor(props: Props) {
    const {loading, editor, isReady, containerRef} = useEditor({...props})

    useEffect(() => {
        if (editor) {
            editor.onDidChangeModelContent(() => {
                if (props.onChange) {
                    props.onChange(editor.getValue())
                }
            })
            editor.onDidBlurEditorText(() => {
                if (props.onBlur) {
                    props.onBlur(editor.getValue())
                }
            })

            editor.setValue(props.value)
        }
    }, [editor, isReady])

    useEffect(() => {
        if (editor) {
            editor.setValue(props.value)
        }
    }, [ props.value])

    return <>
        <div ref={containerRef}></div>
        {loading && <Spin />}
    </>
}