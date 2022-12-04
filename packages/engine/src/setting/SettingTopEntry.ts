import { makeAutoObservable } from 'mobx'
import type Node from '../node'
import SettingField from './SettingField';

export default class SettingTopEntry {
    readonly owner: Node
    readonly id: string;
    fields: SettingField[] = []

    constructor(owner: Node) {
        makeAutoObservable(this, {
            owner: false
        })
        this.id = owner.id
        this.owner = owner
        this.setupFields()
    }

    setupFields = () => {
        this.owner.componentSpec.configure.forEach(conf => {
            this.fields.push(new SettingField(this, conf))
        })
    }

    getPropValue = (propName: string) => {
        return this.owner.getProp(propName)
    }

    getExtraPropValue = (propName: string) => {
        return this.owner.getExtraProp(propName)
    }
}