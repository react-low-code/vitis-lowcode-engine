import { IProjectTemplate } from '../types'
import template from '../template'
import SchemaParser from './SchemaParser'
import { ProjectSchema } from 'vitis-lowcode-types'
import { CodeGeneratorError } from '../utils/error'

export class ProjectBuilder {
    private template: IProjectTemplate;
    private schemaParser: SchemaParser

    constructor(schema: ProjectSchema | string) {
        this.template = template
        this.schemaParser = new SchemaParser(schema)
    }

     async start() {
        if (!this.schemaParser.validate()) {
            throw new CodeGeneratorError('Schema is invalid');
        }
        const projectRoot = await this.template.generateTemplate()

        console.log(projectRoot,'ffff')
    }


}