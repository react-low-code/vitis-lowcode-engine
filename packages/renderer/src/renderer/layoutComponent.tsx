import React, { useContext } from "react";
import { LayoutSchema } from 'vitis-lowcode-types'
import useGetDOM from '../hooks/useGetDOM'
import BaseComponentRenderer from './baseComponentRenderer'
import { Context } from '../context'
import { RendererMode } from '../types'

interface Props {
    schema: LayoutSchema
}

export default function LayoutComponent(props: Props) {
    const rootRef = useGetDOM(props.schema)
    const context = useContext(Context)
    return (
    <div 
        ref={rootRef} 
        data-node-id={props.schema.id} 
        draggable={context.rendererMode === RendererMode.design}
    >
        {!props.schema.children.length ?
        <div style={{color: '#999', textAlign: 'center', height: '100px', lineHeight: '100px'}}>拖入组件{props.schema.id}</div>
        :
        <>
        {props.schema.children.map(child => <BaseComponentRenderer schema={child} key={child.id}/>)}
        </>
        }
    </div>
    )
}