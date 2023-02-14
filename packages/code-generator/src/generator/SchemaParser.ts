import { ProjectSchema } from 'vitis-lowcode-types'

export default class SchemaParser {
    private schema: ProjectSchema

    constructor(schema: ProjectSchema | string) {
        this.schema = typeof schema === 'string' ? JSON.parse(schema) : schema;
    }

    validate() {
        return this.schema.componentsTree.componentName === 'Page'
    }
}