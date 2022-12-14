import React from 'react'
import { observer } from 'mobx-react'
import { WidgetSpec } from 'vitis-lowcode-types'
import './index.less'

interface Props {
    items: WidgetSpec[]
}

@observer
export default class BottomBar extends React.Component<Props, {}> {
    render(){
        if (this.props.items.length) {
            return (
            <div className='bottomBar'>
                {this.props.items.map(item => <div className='item'>{item.content}</div>)}
            </div>
            )
        } else {
            return null
        }

    }
}
