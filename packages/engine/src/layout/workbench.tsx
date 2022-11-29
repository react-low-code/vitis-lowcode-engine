import React from 'react'
import type Skeleton from '../skeleton'
import type Project from '../project'
import TopBar from './topBar'
import BottomBar from './bottomBar'
import MainArea from './mainArea'
import LeftArea from './leftArea'
import RightArea from './rightArea'
import ToolBarArea from './toolBar'
import './workbench.less'

interface Props {
    skeleton: Skeleton
    project: Project
}

export default class Workbench extends React.Component<Props, {}>{
    render() {
        return (
            <div className='vitis-workbench'>
                <TopBar 
                    topLeftAreaItems={this.props.skeleton.topLeftArea.items}
                    topRightAreaItems={this.props.skeleton.topRightArea.items}
                    topCenterAreaItems={this.props.skeleton.topCenterArea.items}
                />
                <div className='vitis-workbench-body'>
                    <LeftArea items={this.props.skeleton.leftArea.items}/>
                    <div className='vitis-workbench-center'>
                        <ToolBarArea items={this.props.skeleton.toolbarArea.items}/>
                        <MainArea componentSpecMap={this.props.project.designer.componentSpecMap}/>
                    </div>
                    <RightArea settingMain={this.props.project.designer.settingMain}/>
                </div>
                <BottomBar items={this.props.skeleton.bottomArea.items}/>
            </div>
        )
    }
}