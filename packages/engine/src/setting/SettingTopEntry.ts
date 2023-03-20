import { makeAutoObservable } from 'mobx'
import type Node from '../node'
import SettingField from './SettingField';

export default class SettingTopEntry {
    readonly owner: Node
    fields: SettingField[] = []

    constructor(owner: Node) {
        makeAutoObservable(this, {
            owner: false
        })
        this.owner = owner
        this.setupFields()
    }

    private setupFields = () => {
        this.owner.componentSpec.configure.forEach(conf => {
            this.fields.push(new SettingField(this, conf))
        })
    }

    getProp = (propName: string) => {
        return this.owner.getProp(propName)
    }

    getExtraProp = (propName: string) => {
        return this.owner.getExtraProp(propName)
    }
}