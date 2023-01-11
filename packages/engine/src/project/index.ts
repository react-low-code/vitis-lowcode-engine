import { makeAutoObservable } from 'mobx'
import Designer from './designer';
import DocumentModel from './documentModel'
import { PageSchema, ObservableProjectSpec, LifeCycles, JSFunction } from 'vitis-lowcode-types'

const defaultPageSchema: PageSchema = {
    componentName: 'Page',
    packageName: 'Page',
    containerType: 'Page',
    isContainer: true,
    children: [],
    props: {
        style: ''
    },
    extraProps: {
        id: {
            type: 'JSRunFunction',
            value: 'node => node.id'
        },
        dataSource: {
            type: 'DataSource',
            value: {
                url: '',
                method: 'GET',
                requestHandler: {
                    type: 'JSFunction',
                    value: 'function requestHandler(params){return params}'
                },
                responseHandler: {
                    type: 'JSFunction',
                    value: 'function responseHandler(response) { return response.data }'
                }
            }
        }
    },
    lifeCycles: {},
    // 网络请求拦截器
    interceptors: {}
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

    updateLifeCycles = (name: keyof LifeCycles, value: JSFunction) => {
        this.documentModel.updateLifeCycles(name, value)
    }

    getLifeCycles = () => {
        return this.documentModel.lifeCycles
    }
}