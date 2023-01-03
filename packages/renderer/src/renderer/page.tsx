import React, { useContext } from 'react'
import { PageSchema } from 'vitis-lowcode-types'
import { Context } from '../context'
import BaseComponentRenderer from './baseComponentRenderer'
import useGetDOM from '../hooks/useGetDOM'
import { transformStringToCSSProperties } from '../utils'
import './page.less'

interface Props {
    schema: PageSchema
}

export default function PageRenderer(props: Props) {
    const context = useContext(Context)
    const rootRef = useGetDOM(props.schema)
    const { style } = props.schema.props

    return (
        <div 
            data-node-id={props.schema.id} 
            className="vitis-page-container"
            ref={rootRef}
            style={typeof style === 'string' ? transformStringToCSSProperties(style): undefined}
        >{
            !props.schema.children.length ? 
            context.customEmptyElement ? context.customEmptyElement(props.schema): null: 
            <>{props.schema.children.map(child => <BaseComponentRenderer schema={child} key={child.id}/>)}</>
        }</div>
    )
}