import React, { createElement, useState } from 'react'
import { observer } from 'mobx-react'
import { EllipsisOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import type SettingField from '../../setting/SettingField'
import { setters } from "../../shell"
import './settingFieldView.less'

interface Props {
    field: SettingField
}

function getSetter(setterName: string) {
    const setter = setters.getSetter(setterName)
    return setter ? setter.view : undefined
}

export default observer(function SettingFieldView(props: Props) {
    const { field } = props
    const [index, setIndex] = useState<number>(0)
    
    const setter = field.setters ? getSetter(field.setters[index].name): undefined
    const val = field.getValue()
    const multiSetter = !!field.setters?.length && field.setters.length > 1
    const onChangeMenu = ({key}: {key: string}) => {
        setIndex(field.setters!.findIndex(item => item.name === key))
    }

    return (
        <div className='vitis-setting-field-view'>
            {field.title && <div className='field-view-title'>{field.title}</div>}
            <div className='field-view-main'>
                {
                 setter ? createElement(setter,{
                    ...field.setters![0].props,
                    field,
                    value: val !== undefined ? val: field.setters![index].props?.value,
                    onChange: field.setValue,
                    key: field.id,
                 }) : <div className='placeholder'>无可用的设置器</div>
                }
            </div>
            {multiSetter && 
            <Dropdown
            placement="topRight"
            menu={{
                items: field.setters.map(item => ({key: item.name, label: item.name})),
                onClick: onChangeMenu,
                activeKey: field.setters[index].name
            }}>
                <EllipsisOutlined className='field-view-setter-toggle'/>
            </Dropdown>
            
            }
        </div>
    )
})
