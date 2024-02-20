import { EventEmitter } from 'eventemitter3';
import type InterProject from '../project';
import { ProjectSpec, LifeCycles, JSFunction, Interceptors } from 'vitis-lowcode-types'

export default class Project extends EventEmitter implements ProjectSpec {
    private readonly project: InterProject
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

    updateInterceptors = (name: keyof Interceptors, value: JSFunction) => {
        this.project.updateInterceptors(name, value)
    }

    getInterceptors(): Interceptors | undefined {
        return this.project.getInterceptors()
    }

    getSchema() {
        return this.project.schema
    }
}