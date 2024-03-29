import React from 'react'
import { NodeSchema } from 'vitis-lowcode-types'
import LayoutComponent from './layoutComponent'
import { isLayoutComponent } from '../utils'
import FormControl from './FormControl'
import UIComponent from './UIComponent'

interface Props {
    schema: NodeSchema
}

export default function BaseRenderer(props: Props){
    if (isLayoutComponent(props.schema)) {
        return <LayoutComponent schema={props.schema} key={props.schema.id}/>
    }  else if (props.schema.isFormControl){
        return <FormControl schema={props.schema} key={props.schema.id}/>
    } else {
        return <UIComponent schema={props.schema} key={props.schema.id}/>
    }
}