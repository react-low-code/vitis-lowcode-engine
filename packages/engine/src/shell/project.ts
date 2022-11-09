import { EventEmitter } from 'eventemitter3';
import type InterProject from '../project';
import { ProjectSpec } from 'vitis-lowcode-types'

export default class Project extends EventEmitter implements ProjectSpec{
    readonly project: InterProject
    constructor(project: InterProject) {
        super()
        this.project = project
    }
}