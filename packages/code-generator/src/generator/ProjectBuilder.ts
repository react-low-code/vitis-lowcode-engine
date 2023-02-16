import { IProjectTemplate, Modules } from '../types'
import template from '../template'
import SchemaParser from './SchemaParser'
import { ProjectSchema } from 'vitis-lowcode-types'
import { CodeGeneratorError } from '../utils/error'
import ModuleBuilder from './ModuleBuilder'
import { insertFile } from '../utils/templateHelper'

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

        const builders = this.createModuleBuilders()

        if (builders.packageJSON) {
            insertFile(projectRoot, builders.packageJSON.path, builders.packageJSON.generateModule(this.schemaParser.schema))
        }

        if (builders.htmlEntry) {
            insertFile(projectRoot, builders.htmlEntry.path, builders.htmlEntry.generateModule(this.schemaParser.schema))
        }

        if (builders.service) {
            insertFile(projectRoot, builders.service.path, builders.service.generateModule(this.schemaParser.schema))
        }

        if (builders.pages) {
            builders.pages.generatePage(this.schemaParser.schema, projectRoot,'Home')
        }
    }

    createModuleBuilders() {
        let builders: Record<string, ModuleBuilder> = {}
        const slotNames: Modules[]  = Object.keys(this.template.slots) as Modules[]
        for (const slotName of slotNames) {
            builders[slotName] = new ModuleBuilder(this.template.slots[slotName])
        }

        return builders as Record<Modules, ModuleBuilder>
    }
}