import { useContext, useEffect, useRef } from 'react'
import { NodeSchema } from 'vitis-lowcode-types'
import { Context } from '../context'
import { RendererMode } from '../types'

export default function useGetDOM(schema: NodeSchema) {
    const context = useContext(Context)
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (context.rendererMode === RendererMode.design && context.onCompGetRef) {
            context.onCompGetRef(schema, rootRef.current)
        }
        if (rootRef.current) {
            rootRef.current.draggable = context.rendererMode === RendererMode.design

            if (schema.id) {
                rootRef.current.setAttribute('data-node-id', schema.id)
            }
        }
        return () => {
            if (context.rendererMode === RendererMode.design && context.onCompGetRef) {
                context.onCompGetRef(schema, null)
            }
        }
    },[])

    return rootRef
}