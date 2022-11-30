import type SettingTopEntry from "./SettingTopEntry";
import { FieldConfig } from '../types'
import { uniqueId, transformStringToFunction } from '../utils'
import { JSFunction, PropValue } from 'vitis-lowcode-types'

function isJsFunction(value: PropValue): value is JSFunction {
    return !!value && (value as any).type === 'JSFunction'
}

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

    private get isGroup() {
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

    private get isExtra() {
        return !this.isGroup && this.config.isExtra === true
    }

    getValue() {
        let value: PropValue | undefined
        if (!this.isExtra) {
            value = this.owner.getPropValue(this.name)?.export()
        } else {
            value = this.owner.getExtraPropValue(this.name)?.export()
        }

        if (isJsFunction(value)) {
            const tempFunc = transformStringToFunction(value.value)
            return tempFunc(this.owner.owner)
        } else {
            return value
        }       
    }

    setValue(value: PropValue) {
        if (!this.isExtra) {
            this.owner.setPropValue(this.name, value)
        } else {
            this.owner.setExtraPropValue(this.name, value)
        }
        
    }
}