import type SettingTopEntry from "./SettingTopEntry";
import { FieldConfig } from '../types'
import { uniqueId, transformStringToFunction, isJsRunFunction } from '../utils'
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

    private get isGroup() {
        return this.config.type === 'group'
    }

    get title () {
        return this.config.title
    }

    get name () {
        return this.config.name
    }

    get parentName() {
        return this.config.parentName
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

    private get PropKey() {
        const name: string = this.parentName ? this.parentName: this.name
        const subName: string | undefined = this.parentName ? this.name : undefined
        return {name, subName}
    }

    getValue = () => {
        let value: PropValue | undefined
       const {name, subName} = this.PropKey

        if (!this.isExtra) {
            value = this.owner.getPropValue(name)?.getValue(subName)
        } else {
            value = this.owner.getExtraPropValue(name)?.getValue(subName)
        }

        if (isJsRunFunction(value)) {
            const tempFunc = transformStringToFunction(value.value)
            return tempFunc(this.owner.owner)
        } else {
            return value
        }       
    }

    setValue = (value: PropValue) => {
        const {name, subName} = this.PropKey

        if (!this.isExtra) {
            this.owner.getPropValue(name)?.setValue(value, subName)
        } else {
            this.owner.getExtraPropValue(name)?.setValue(value, subName)
        }
        
    }
}