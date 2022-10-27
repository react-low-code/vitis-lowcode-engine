import type InnerProject from '../project'
import { ProjectSpec } from 'vitis-lowcode-types'

export default class Project implements ProjectSpec {
    private innerProject: InnerProject

    constructor(project: InnerProject) {
        this.innerProject = project
    }

    emit(eventName: symbol, ...arg: any[]) {
        return this.innerProject.event.emit(eventName, ...arg)
    }

    on(eventName: symbol, fn: (...args: any[]) => void) {
        return this.innerProject.event.on(eventName, fn)
    }
}