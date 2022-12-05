import React, { createElement } from 'react'
import { observer } from 'mobx-react'
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
    
    const setter = field.setters ? getSetter(field.setters[0].name): undefined
    const val = field.getValue()

    return (
        <div className='vitis-setting-field-view'>
            {field.title && <div className='field-view-title'>{field.title}</div>}
            <div className='field-view-main'>
                {
                 setter ? createElement(setter,{
                    ...field.setters![0].props,
                    field,
                    value: val !== undefined ? val: field.setters![0].props?.value,
                    onChange: field.setValue,
                    key: field.id,
                 }) : <div className='placeholder'>无可用的设置器</div>
                }
            </div>
        </div>
    )
})
