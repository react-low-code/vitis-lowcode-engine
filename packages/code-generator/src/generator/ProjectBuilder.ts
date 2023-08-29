import { IProjectTemplate, FixedSlotsName, ResultDir } from '../types'
import SchemaParser from './SchemaParser'
import { ProjectSchema } from 'vitis-lowcode-types'
import { CodeGeneratorError } from '../utils/error'
import FileBuilder from './FileBuilder'
import { writeFolder } from '../utils/disk'
import fs from 'fs'

export class ProjectBuilder {
    private template: IProjectTemplate;
    private schemaParser: SchemaParser
    private projectRoot: ResultDir = {name: '.', dirs: [], files: []}

    constructor(schema: ProjectSchema | string, template: IProjectTemplate) {
        this.template = template
        this.schemaParser = new SchemaParser(schema)
    }

     async start() {
        if (!this.schemaParser.validate()) {
            throw new CodeGeneratorError('Schema is invalid');
        }
        const projectRoot = this.template.generateStaticFiles()

        const builders = this.createFileBuilders()
        if (builders.packageJSON) {
            builders.packageJSON.generateFile(this.schemaParser.schema, projectRoot)
        }

        if (builders.htmlEntry) {
            builders.htmlEntry.generateFile(this.schemaParser.schema, projectRoot)
        }

        if (builders.service) {
            builders.service.generateFile(this.schemaParser.schema, projectRoot)
        }

        if (builders.pages) {
            builders.pages.generateModule(this.schemaParser.schema, projectRoot)
        }

        this.projectRoot = projectRoot

        return this
    }

    private createFileBuilders() {
        let builders: Record<string, FileBuilder> = {}
        const slotNames: FixedSlotsName[]  = Object.keys(this.template.fixedSlots) as FixedSlotsName[]
        for (const slotName of slotNames) {
            builders[slotName] = new FileBuilder(this.template.fixedSlots[slotName], this.template.dynamicSlots)
        }

        return builders as Record<FixedSlotsName, FileBuilder>
    }

    writeToDisk(path: string, createProjectFolder: boolean = true) {
        writeFolder(this.projectRoot,path, createProjectFolder, fs)
    }
}