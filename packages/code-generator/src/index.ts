import { ProjectSchema } from 'vitis-lowcode-types'
import { ProjectBuilder } from './generator/ProjectBuilder'
import template from './template'

export function generateProject(schema: ProjectSchema) {
    const builder = new ProjectBuilder(schema,template)

    builder.start()

    return builder
}
