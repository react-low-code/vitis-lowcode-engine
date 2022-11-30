import type SettingTopEntry from "./SettingTopEntry";
import { FieldConfig } from '../types'
import { uniqueId } from '../utils'
import { PropValue } from 'vitis-lowcode-types'

export default class SettingField {
    owner: SettingTopEntry
    readonly config: FieldConfig
    readonly id: string
    fields: SettingField[] = []

    constructor(owner: SettingTopEntry, config: FieldConfig) {
        this.owner = owner
        this.config = config
        this.id = uniqueId('settingField')

        if (this.config.fields?.length) {
            this.fields = this.config.fields.map(item => {
                return new SettingField(this.owner, item)
            })
        }
    }

    get isGroup() {
        return this.config.type === 'group'
    }

    get title () {
        return this.config.title
    }

    get name () {
        return this.config.name
    }

    get hiddenTitle() {
        return this.config.hiddenTitle === true
    }

    get setters() {
        return this.config.setters
    }

    getValue() {
        return this.owner.getPropValue(this.name)?.export()
    }

    setValue(value: PropValue) {
        return this.owner.setPropValue(this.name, value)
    }
}