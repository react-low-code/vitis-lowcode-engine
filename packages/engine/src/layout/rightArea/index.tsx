import React from 'react'
import { observer } from 'mobx-react'
import { Breadcrumb, Tabs } from 'antd';
import type SettingMain  from '../../setting'
import SettingPanel from './settingPanel';

import './index.less'

interface Props {
    settingMain?: SettingMain
}

interface State {
    activeTab?: string
}

@observer
export default class RightArea extends React.Component<Props, State> {
    state: Readonly<State> =  {

    }
    componentDidMount() {
        this.setDefaultActiveTab()
    }

    componentDidUpdate(prev: Props) {
        if (prev.settingMain?.settingEntry !== this.props.settingMain?.settingEntry) {
            this.setDefaultActiveTab()
        }
    }

    setDefaultActiveTab() {
        const settingEntry = this.props.settingMain?.settingEntry
        if (settingEntry && settingEntry.fields.length) {
            this.setState({
                activeTab: settingEntry.fields[0].id
            })
        }
    }

    onChangeTab = (activeTab: string) => {
        this.setState({
            activeTab
        })
    }


    render(){
        const settingEntry = this.props.settingMain?.settingEntry
        if (!settingEntry) {
            return <div className='rightArea'>请在画布上选中节点</div>
        }
        if (!settingEntry.fields.length) {
            return <div className='rightArea'>该组件暂无配置</div>
        }
        const items = settingEntry.fields.map(filed => {
            return {
                label: filed.title,
                key: filed.id,
                children: <SettingPanel target={filed} key={filed.id}/>
            }
        })

        return (
        <div className='rightArea'>
            {this.renderBreadcrumb()}
            <Tabs
                size="small"
                items={items}
                // activeKey={this.state.activeTab}
                onChange={this.onChangeTab}
            />
        </div>
        )
    }

    renderBreadcrumb() {
        const items: {label: string; key: string}[] = []
        let node = this.props.settingMain?.settingEntry?.owner
        while (node) {
            items.push({
                label: node.title,
                key: node.id
            })
            node = node.parent
        }

        return (
            <Breadcrumb>
                <Breadcrumb.Item menu={{ items }}>组件</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}
