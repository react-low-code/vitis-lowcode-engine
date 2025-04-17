import React from 'react'
import cn from 'classnames'
import { Popover } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { DragonSpec } from 'vitis-lowcode-types'

import './index.less'
import '../common.less'

interface ComponentItem {
    componentName: string;
    iconUrl: string;
    packageName: string;
    title: string;
}

interface State {
    active?: boolean;
    layoutComponents: ComponentItem[];
    baseComponents: ComponentItem[];
    subjoinComponents: ComponentItem[];
    templates: ComponentItem[];
    height: number

}

export default class ComponentsPane extends React.Component<{},State>{
    state: Readonly<State> = {
        active: false,
        layoutComponents: [],
        subjoinComponents: [],
        baseComponents: [],
        templates: [],
        height: 300
    }

    onOpenChange = () => {
        this.setState((s) => {
            return {
                active: !s.active
            }
        })
    }

    updateAsset = () => {
        if (window.VitisLowCodeEngine) {
            const componentSpecRawMap = window.VitisLowCodeEngine.material.getAll()
            const layoutComponents: ComponentItem[] = []
            const subjoinComponents: ComponentItem[] = []
            const baseComponents: ComponentItem[] = []
            const templates: ComponentItem[] = []
            for(const [key,componentSpecRaw] of componentSpecRawMap) {
                const seg: ComponentItem = {
                    componentName: componentSpecRaw.componentName,
                    iconUrl: componentSpecRaw.iconUrl,
                    packageName: componentSpecRaw.packageName,
                    title: componentSpecRaw.title
                }
                if (componentSpecRaw.group === 'layout') {
                    layoutComponents.push(seg)
                } else if (componentSpecRaw.group === 'base') {
                    baseComponents.push(seg)
                } else if (componentSpecRaw.group === 'subjoin') {
                    subjoinComponents.push(seg)
                } else if (componentSpecRaw.group === 'template') {
                    templates.push(seg)
                }
            }

            this.setState({
                layoutComponents,
                subjoinComponents,
                baseComponents,
                templates
            })
            
        }
    }

    componentDidMount() {
        this.updateAsset()
       
        if (window.VitisLowCodeEngine) {
            window.VitisLowCodeEngine.material.on(window.VitisLowCodeEngine.ASSET_UPDATED, this.updateAsset)
            window.VitisLowCodeEngine.project.on(window.VitisLowCodeEngine.DRAG_OVER, this.onDragOver)
        }

        this.setState({
            height: document.body.clientHeight - 130
        })
    }

    componentWillUnmount() {
        if (window.VitisLowCodeEngine) {
            window.VitisLowCodeEngine.material.off(window.VitisLowCodeEngine.ASSET_UPDATED, this.updateAsset)
            window.VitisLowCodeEngine.project.off(window.VitisLowCodeEngine.DRAG_OVER, this.onDragOver)
        }
    }

    onDragOver = () => {
        this.setState({
            active: false
        })
    }

    renderComponentGroup(title: string, components: ComponentItem[]) {
        if (!components.length) {
            return null
        } else {
            return (
                <div className='components-group'>
                    <div className='title'>{title}</div>
                    <div className='body'>
                        {components.map(item => 
                        <div 
                            className='component' 
                            draggable={true} 
                            onDragStart={() => this.onDragStart(item.packageName)}
                        >
                            <img src={item.iconUrl} draggable={false} className='img'/>
                            <div className='name'>{item.title}</div>
                        </div>)
                        }
                    </div>
                </div>
            )
        }
    }

    onDragStart = ( packageName: string) => {
        if (window.VitisLowCodeEngine) {
            const dragon = window.VitisLowCodeEngine.dragon as DragonSpec
            dragon.onNodeDataDragStart(packageName)
        }
    }

    render(){
        return <div className='components-pane'>
            <Popover 
                trigger="click"
                placement="rightTop"
                content={<div className='components-pane-body pane-body' style={{height: this.state.height + 'px'}}>
                {this.renderComponentGroup('模板', this.state.templates)}
                {this.renderComponentGroup('布局组件', this.state.layoutComponents)}
                {this.renderComponentGroup('基础组件', this.state.baseComponents)}
                {this.renderComponentGroup('高级组件', this.state.subjoinComponents)}
                </div>}
                onOpenChange={this.onOpenChange}
                open={this.state.active}
            >
                <AppstoreOutlined style={{fontSize: '20px'}} />
            </Popover>
        </div>
    }
}