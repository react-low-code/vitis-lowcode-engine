import React from 'react'
import { WidgetSpec } from 'vitis-lowcode-types'
import { observer } from 'mobx-react'

import './index.less'

interface Props {
    items: WidgetSpec[]
}

@observer
export default class LeftArea extends React.Component<Props, {}> {
    render(){
        if (this.props.items.length) {
            return (
            <div className='leftArea'>
                {this.props.items.map(item => <div className='item'>{item.content}</div>)}
            </div>
            )
        } else {
            return null
        }
    }
}
