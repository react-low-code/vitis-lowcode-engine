import React from 'react'
import cn from 'classnames'
import { Popover } from 'antd';
import Icon from './Component'
import './index.less'

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
    height: number

}

export default class ComponentsPane extends React.Component<{},State>{
    state: Readonly<State> = {
        active: false,
        layoutComponents: [],
        subjoinComponents: [],
        baseComponents: [],
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
                }
            }

            this.setState({
                layoutComponents,
                subjoinComponents,
                baseComponents
            })
            
        }
    }

    componentDidMount() {
        this.updateAsset()
       
        if (window.VitisLowCodeEngine) {
            window.VitisLowCodeEngine.project.on(window.VitisLowCodeEngine.ASSET_UPDATE, this.updateAsset)
        }

        this.setState({
            height: document.body.clientHeight - 130
        })
    }

    componentWillUnmount() {
        if (window.VitisLowCodeEngine) {
            window.VitisLowCodeEngine.project.off(window.VitisLowCodeEngine.ASSET_UPDATE, this.updateAsset)
        }
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
                        <div className='component'>
                            <img src={item.iconUrl}/>
                            <div className='name'>{item.title}</div>
                        </div>)
                        }
                    </div>
                </div>
            )
        }
    }

    render(){
        return <div className='components-pane'>
            <Popover 
                trigger="click"
                placement="rightTop"
                content={<div className='components-pane-body' style={{height: this.state.height + 'px'}}>
                {this.renderComponentGroup('布局组件', this.state.layoutComponents)}
                {this.renderComponentGroup('基础组件', this.state.baseComponents)}
                {this.renderComponentGroup('高级组件', this.state.subjoinComponents)}
                </div>}
                onOpenChange={this.onOpenChange}
            >
                <Icon 
                    className={cn({icon: true, active: this.state.active})}
                />
            </Popover>
        </div>
    }
}