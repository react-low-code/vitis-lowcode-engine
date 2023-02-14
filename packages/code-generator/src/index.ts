import { ProjectSchema } from 'vitis-lowcode-types'
import { ProjectBuilder } from './generator/ProjectBuilder'

export function generateProject(schema: ProjectSchema) {
    const builder = new ProjectBuilder(schema)

    builder.start()
}
