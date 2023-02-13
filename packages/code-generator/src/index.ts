import { ProjectSchema } from 'vitis-lowcode-types'

export function createProjectBuilder() {
    return {
        generateProject(schema: ProjectSchema) {
            console.log(schema,'sssss')
        }
    }
}