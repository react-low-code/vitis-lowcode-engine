import { makeAutoObservable } from 'mobx'
import Designer from './designer';
import Host from './host'
import DocumentModel from './documentModel'
import { PageSchema, ObservableProjectSpec } from 'vitis-lowcode-types'

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

export default class Project  implements ObservableProjectSpec{
    readonly designer = new Designer()
    readonly host = new Host(this)
    readonly documentModel: DocumentModel

    get schema() {
        return this.documentModel.schema as PageSchema
    }

    get componentsMap() {
        return {}
    }

    constructor(schema: PageSchema = defaultPageSchema) {
        makeAutoObservable(this, {
            designer: false,
            host: false,
            documentModel: false
        })

        this.documentModel = new DocumentModel(schema)
    }

    setSchema(schema: PageSchema) {
        this.documentModel.open(schema)
    }
}