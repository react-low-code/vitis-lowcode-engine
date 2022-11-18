import React from 'react'
import { observer } from 'mobx-react'
import { Spin } from 'antd';

import CanvasView from './canvasView'
import LocationTools from './locationTools'
import type ComponentSpec from '../../project/componentSpec'

import './index.less'

interface Props {
    componentSpecMap: Map<string, ComponentSpec>
}

@observer
export default class MainArea extends React.Component<Props, {}> {
    render(){
        if (this.props.componentSpecMap.size < 1) {
            return <Spin size="large" tip="启动中..." className='vitis-main-loading'/>
        }
        return (
        <div className='vitis-main-area'>
            <CanvasView />
            <LocationTools />
        </div>
        )
    }
}
