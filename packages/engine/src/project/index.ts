import { EventEmitter } from 'eventemitter3';
import Designer from './designer';
import Host from './host'
import DocumentModel from './documentModel'
import { PageSchema } from 'vitis-lowcode-types'

const defaultPageSchema: PageSchema = {
    componentName: 'Page',
    containerType: 'Page',
    isContainer: true,
    children: [],
    props: {},
    dataSource: {
        url: '',
        method: 'GET',
        requestHandler: {
            type: 'JSFunction',
            value: 'function(params){return params}'
        },

        responseHandler: {
            type: 'JSFunction',
            value: 'function(response) { return response.data }'
        }
    },
}

export default class Project extends EventEmitter{
    readonly designer = new Designer()
    readonly host = new Host(this)
    readonly documentModel: DocumentModel

    get schema() {
        return this.documentModel.schema
    }

    get componentsMap() {
        return {}
    }

    constructor(schema: PageSchema = defaultPageSchema) {
        super()
        this.documentModel = new DocumentModel(schema)
    }
}