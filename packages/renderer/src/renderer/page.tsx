import React from 'react'
import { PageSchema } from 'vitis-lowcode-types'
import { Context } from '../context'

interface Props {
    nodeSchema: PageSchema
}
export default class PageRenderer extends React.Component<Props, {}>{
    static contextType = Context;
    context: React.ContextType<typeof Context>

    render() {
        if (!this.props.nodeSchema.children.length) {
            return this.context.emptyPageComponent
        } else {
            return (
null
                )
        }
        
    }
}