import { useEffect, useState, useRef } from 'react'
import loader from '@monaco-editor/loader';
import type { editor as oEditor } from 'monaco-editor';
import { js_beautify } from 'js-beautify'

export interface EditorConfig {
    value: string;
    language: string;
}

export function useEditor(config: EditorConfig) {
    const [loading, setLoading] = useState<boolean>(false)
    const [isReady, setIsReady] = useState<boolean>(false)
    const editor = useRef<oEditor.IStandaloneCodeEditor>()
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLoading(true);
        loader.config({
            paths: {
                vs: 'https://g.alicdn.com/code/lib/monaco-editor/0.33.0/min/vs',
              },
        });

        loader.init()
        .then(monaco => {
            if (containerRef.current) {
                containerRef.current.style.height = '200px'
                editor.current = monaco.editor.create(containerRef.current, {
                    value: js_beautify(config.value),
                    language: config.language,
                })
                setIsReady(true)
            }
            
            setLoading(false)

        }, () => {
            setLoading(false)
        })
    }, [])

    return {loading, isReady, editor: editor.current, containerRef}
}