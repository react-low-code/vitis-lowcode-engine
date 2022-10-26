import React from 'react'
import { BaseWidgetSpec } from 'vitis-lowcode-types'
import './index.less'

interface Props {
    topLeftAreaItems: BaseWidgetSpec[];
    topRightAreaItems: BaseWidgetSpec[];
    topCenterAreaItems: BaseWidgetSpec[];
}

export default class TopBar extends React.Component<Props, {}> {
    render(){
        return (
        <div className='topBar'>
            <div className='topBarLeft'>{this.props.topLeftAreaItems.map(item => item.content)}</div>
            <div className='topBarCenter'>{this.props.topCenterAreaItems.map(item => item.content)}</div>
            <div className='topBarRight'>{this.props.topRightAreaItems.map(item => item.content)}</div>
        </div>
        )
    }
}
