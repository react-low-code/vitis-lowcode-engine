import React from "react";
import { LayoutSchema } from 'vitis-lowcode-types'
import useGetDOM from '../hooks/useGetDOM'
import BaseComponentRenderer from './baseComponentRenderer'

interface Props {
    schema: LayoutSchema
}

export default function LayoutComponent(props: Props) {
    const rootRef = useGetDOM(props.schema)
    return (
    <div ref={rootRef} data-node-id={props.schema.id}>
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