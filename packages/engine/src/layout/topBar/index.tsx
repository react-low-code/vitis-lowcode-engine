import React from 'react'
import { observer } from 'mobx-react'
import { WidgetSpec } from 'vitis-lowcode-types'
import './index.less'

interface Props {
    topLeftAreaItems: WidgetSpec[];
    topRightAreaItems: WidgetSpec[];
    topCenterAreaItems: WidgetSpec[];
}

@observer
export default class TopBar extends React.Component<Props, {}> {
    render(){
        return (
        <div className='topBar'>
            <div className='topBarLeft'>{this.props.topLeftAreaItems.map(item => <div className='item'>{item.content}</div>)}</div>
            <div className='topBarCenter'>{this.props.topCenterAreaItems.map(item => <div className='item'>{item.content}</div>)}</div>
            <div className='topBarRight'>{this.props.topRightAreaItems.map(item => <div className='item'>{item.content}</div>)}</div>
        </div>
        )
    }
}
