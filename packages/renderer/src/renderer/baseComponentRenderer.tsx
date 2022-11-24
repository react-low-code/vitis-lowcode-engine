import React from 'react'
import { NodeSchema } from 'vitis-lowcode-types'
import LayoutComponent from './layoutComponent'
import { isLayoutComponent } from '../utils'

interface Props {
    schema: NodeSchema
}

export default function BaseRenderer(props: Props){
    if (isLayoutComponent(props.schema)) {
        return <LayoutComponent schema={props.schema}/>
    }  else {
        return <div>未知组件</div>
    }
}