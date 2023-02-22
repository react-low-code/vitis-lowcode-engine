import { ProjectSchema } from 'vitis-lowcode-types'
import { CodeStructInput } from '../types'

export default class SchemaParser {
    readonly schema: CodeStructInput

    constructor(schema: ProjectSchema | string) {
        const schemaFormatted = typeof schema === 'string' ? JSON.parse(schema) : schema;

        this.schema = {
            ...schemaFormatted,
            schema: schemaFormatted.componentsTree || {}
        }
    }

    validate() {
        return this.schema.schema.componentName === 'Page'
    }
}