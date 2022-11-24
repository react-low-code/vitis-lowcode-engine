import React, { useContext } from 'react'
import { PageSchema } from 'vitis-lowcode-types'
import { Context } from '../context'
import BaseComponentRenderer from './baseComponentRenderer'
import useGetDOM from '../hooks/useGetDOM'

interface Props {
    schema: PageSchema
}

export default function PageRenderer(props: Props) {
    const context = useContext(Context)
    const rootRef = useGetDOM(props.schema)

    return (
        <div 
            data-node-id={props.schema.id} 
            style={{minHeight: '100%'}}
            ref={rootRef}
        >{
            !props.schema.children.length ? 
            context.emptyPageComponent: 
            <>{props.schema.children.map(child => <BaseComponentRenderer schema={child} key={child.id}/>)}</>
        }</div>
    )
}