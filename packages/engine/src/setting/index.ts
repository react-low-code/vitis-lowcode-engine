import { makeAutoObservable } from 'mobx'
import type SettingTopEntry from './SettingTopEntry'

export default class SettingMain {
    settingEntry?: SettingTopEntry

    constructor() {
        makeAutoObservable(this)
    }

    setup = (settingEntry: SettingTopEntry | undefined) => {
        this.settingEntry = settingEntry
    }
}