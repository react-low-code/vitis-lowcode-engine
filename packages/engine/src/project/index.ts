import { makeAutoObservable } from 'mobx'
import Designer from './designer';
import DocumentModel from './documentModel'
import { PageSchema, ObservableProjectSpec, LifeCycles, JSFunction, Interceptors, SimulatorSpec } from 'vitis-lowcode-types'

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
    interceptors: {
        response: {
            type: 'JSFunction',
            value: `
            /**
             * axios 响应拦截器
             * @responseData： AxiosResponse['data']
            */
             function responseInterceptor(responseData){ 
                if (responseData.code !== '0') {
                    return Promise.reject(responseData.msg)
                } else {
                    if (responseData.data.token) {
                        localStorage.setItem('token', responseData.data.token)
                    }
                    return responseData.data
                }
            }`
        },
        request: {
            type: "JSFunction",
            value: `
            function requestInterceptor(config) {
                const token = localStorage.getItem('token')
                if (token) {
                    if (!config.headers) {
                        config.headers = {}
                    }
                    config.headers.authorization = token;
                }
                return config;
            }
            `
        }
    }
}

export default class Project  implements ObservableProjectSpec{
    readonly designer = new Designer(this)
    readonly documentModel: DocumentModel
    renderer: SimulatorSpec

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

    setRenderer(renderer: SimulatorSpec) {
        this.renderer = renderer;
    }

    updateLifeCycles = (name: keyof LifeCycles, value: JSFunction) => {
        this.documentModel.updateLifeCycles(name, value)
    }

    getLifeCycles = () => {
        return this.documentModel.lifeCycles
    }

    updateInterceptors = (name: keyof Interceptors, value: JSFunction) => {
        this.documentModel.updateInterceptors(name, value)
    }

    getInterceptors = () => {
        return this.documentModel.interceptors
    }
}