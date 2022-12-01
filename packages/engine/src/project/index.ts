import { makeAutoObservable } from 'mobx'
import Designer from './designer';
import DocumentModel from './documentModel'
import { PageSchema, ObservableProjectSpec } from 'vitis-lowcode-types'

const defaultPageSchema: PageSchema = {
    componentName: 'Page',
    packageName: 'Page',
    containerType: 'Page',
    isContainer: true,
    children: [],
    props: {

    },
    extraProps: {
        id: {
            type: 'JSFunction',
            value: 'node => node.id'
        }
    },
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
    readonly designer = new Designer(this)
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
            documentModel: false
        })
        
        this.documentModel = new DocumentModel(this,schema)
    }

    setSchema(schema: PageSchema) {
        this.documentModel.open(schema)
    }
}