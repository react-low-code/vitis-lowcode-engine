import { IProjectTemplate, Modules } from '../types'
import template from '../template'
import SchemaParser from './SchemaParser'
import { ProjectSchema } from 'vitis-lowcode-types'
import { CodeGeneratorError } from '../utils/error'
import ModuleBuilder from './ModuleBuilder'

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
            builders.packageJSON.generateModule(this.schemaParser.schema, projectRoot)
        }

        if (builders.htmlEntry) {
            builders.htmlEntry.generateModule(this.schemaParser.schema, projectRoot)
        }

        if (builders.service) {
            builders.service.generateModule(this.schemaParser.schema, projectRoot)
        }

        if (builders.pages) {
            builders.pages.generatePage(this.schemaParser.schema, projectRoot)
        }
    }

    createModuleBuilders() {
        let builders: Record<string, ModuleBuilder> = {}
        const slotNames: Modules[]  = Object.keys(this.template.fixedSlots) as Modules[]
        for (const slotName of slotNames) {
            builders[slotName] = new ModuleBuilder(this.template.fixedSlots[slotName], this.template.dynamicSlots)
        }

        return builders as Record<Modules, ModuleBuilder>
    }
}