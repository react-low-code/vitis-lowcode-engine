import React, { createElement } from 'react'
import type SettingField from '../../setting/SettingField'
import './settingFieldView.less'

interface Props {
    field: SettingField
}

export default function SettingFieldView(props: Props) {
    const { field } = props
    return (
        <div className='vitis-setting-field-view'>
            {!field.hiddenTitle && <div className='field-view-title'>{field.title}</div>}
            <div className='field-view-main'>
                {
                createElement('div',null,'effff')
                }
            </div>
        </div>
    )
}
