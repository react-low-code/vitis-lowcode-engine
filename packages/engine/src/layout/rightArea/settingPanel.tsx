import React from 'react'
import type SettingField from '../../setting/SettingField'

import './settingPanel.less'

interface Props {
    target: SettingField
}



export default function SettingPanel(props: Props) {
    return (
        <div className='vitis-settings-pane'>
            {props.target.fields.map(field => {
                return <div>{field.name}</div>
            })}
        </div>
    )
}