import { EventEmitter } from 'eventemitter3';
import type InterProject from '../project';
import { ProjectSpec, LifeCycles, JSFunction } from 'vitis-lowcode-types'

export default class Project extends EventEmitter implements ProjectSpec{
    readonly project: InterProject
    constructor(project: InterProject) {
        super()
        this.project = project
    }

    updateLifeCycles = (name: keyof LifeCycles, value: JSFunction) => {
        this.project.updateLifeCycles(name, value)
    }

    getLifeCycles = () => {
        return this.project.getLifeCycles()
    }
}