import React from 'react'
import { BaseWidgetSpec } from 'vitis-lowcode-types'

import './index.less'

interface Props {
    items: BaseWidgetSpec[]
}

export default class LeftArea extends React.Component<Props, {}> {
    render(){
        if (this.props.items.length) {
            return (
            <div className='leftArea'>
                {this.props.items.map(item => item.content)}
            </div>
            )
        } else {
            return null
        }
    }
}
