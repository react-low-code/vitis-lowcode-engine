import { ComponentSpecRaw, NodeSchema, SetterConfig } from 'vitis-lowcode-types'
import { FieldConfig, FieldGroupConfig, FieldSingleConfig } from '../types'

export default class ComponentSpec {
    configure: FieldConfig[] = [];
    rawData: ComponentSpecRaw
    extraProps: any

    constructor(componentSpecRaw: ComponentSpecRaw) {
        this.rawData = componentSpecRaw
        this.parseRawData()
    }

    get parentWhitelist() {
        return this.rawData.advanced?.nestingRule?.parentWhitelist
    }

    get childWhitelist() {
        return this.rawData.advanced?.nestingRule?.childWhitelist
    }

    get componentName() {
        return this.rawData.componentName
    }

    get unableDel() {
        return this.rawData.advanced?.component?.containerType === 'Page'
    }

    get unableCopy() {
        return this.rawData.advanced?.component?.containerType === 'Page'
    }

    get unableMove() {
        return this.rawData.advanced?.component?.containerType === 'Page'
    }

    get title() {
        return this.rawData.title
    }

    /**
     * 这个组件的初始 schema
     */
    get schema(): NodeSchema {
        const props: {[attr: string]: any} = {}
        this.rawData.props.forEach(prop => {
            props[prop.name] = prop.defaultValue
        })
        const supports = this.rawData.advanced?.supports
        if (supports?.styles) {
            props['style'] = ''
        }

        return {
            componentName: this.componentName,
            props,
            extraProps: this.extraProps,
            isContainer: !!this.rawData.advanced?.component?.isContainer,
            children: [],
            containerType: this.rawData.advanced?.component?.containerType || undefined,
            packageName: this.rawData.packageName
        }
    }

    private parseRawData = () => {
        this.genConfigure()
        this.initExtraProps()
    }

    private initExtraProps = () => {
        // 将取值路径、name 和 id 放在 extraProps 中
        this.extraProps = {
            id: {
                type: 'JSRunFunction',
                value: "node => node.id"
            }
        }

        if (this.rawData.advanced?.component?.containerType !== 'Page') {
            this.extraProps.pathToVal = ''
        }

        if (this.rawData.advanced?.component?.isFormControl) {
            this.extraProps.name = ''
        }
    }

    private genConfigure = () => {
        this.configure.push(this.getPropsConfig())
        const supports = this.rawData.advanced?.supports
        if (supports?.styles) {
            this.configure.push({
                type: 'group',
                title: '样式',
                name: 'style',
                fields: [
                    {
                        type: 'field',
                        title: '样式',
                        name: 'style',
                        hiddenTitle: true,
                        setters: [{ name: 'StyleSetter' }] as FieldSingleConfig['setters']
                    }
                ]
            })
        }

        if (this.rawData.advanced?.component?.isContainer) {
            this.configure.push({
                type: 'group',
                title: '数据源',
                name: 'dataSource',
                fields: [
                    {
                        type: 'field',
                        hiddenTitle: true,
                        title: 'tip',
                        name: 'tip',
                        isExtra: true,
                        setters: [{ 
                            name: 'TextSetter', 
                            props: {
                                value: '这里的配置将发送网络请求，它返回的数据优先级高于取值',
                                style: {
                                    color: 'red',
                                    fontSize: '12px'
                                }
                            } 
                        }]
                    },
                    {
                        type: 'field',
                        title: 'URL',
                        name: 'url',
                        parentName: 'dataSource',
                        isExtra: true,
                        setters: [{ 
                            name: 'StringSetter'
                        }]
                    },
                    {
                        type: 'field',
                        title: '请求方式',
                        name: 'method',
                        parentName: 'dataSource',
                        isExtra: true,
                        setters: [{ 
                            name: 'RadioGroupSetter',
                            props: {
                                options: [{label: 'GET', value: 'GET'}, {label: 'POST', value: 'POST'}]
                            }
                        }]
                    },
                    {
                        type: 'field',
                        title: '请求处理器',
                        parentName: 'dataSource',
                        name: 'requestHandler',
                        isExtra: true,
                        setters: [{
                            name: 'FunctionSetter',
                        }]
                    },
                    {
                        type: 'field',
                        title: '返回值处理器',
                        parentName: 'dataSource',
                        name: 'responseHandler',
                        isExtra: true,
                        setters: [{
                            name: 'FunctionSetter',
                        }]
                    }
                ]
            })
        }
    }

    private getPropsConfig = (): FieldGroupConfig => {
        const getSettersName = (setterConfig: SetterConfig | SetterConfig[]) => {
            if (!Array.isArray(setterConfig)) {
                setterConfig = [setterConfig]
            }

            return setterConfig.map(config => ({
                name: config.isUseSelf ? this.rawData.packageName + '/' + config.setterName : config.setterName,
                props: config.props
            }))
        }

        const getExtraPropsConfig = () => {
            const extraPropsConfig: FieldSingleConfig[] = []
            extraPropsConfig.push({
                type: 'field',
                title: 'ID',
                name: 'id',
                isExtra: true,
                setters: [{ 
                    name: 'TextSetter', 
                    props: {
                        style: {
                            color: '#999'
                        }
                    }
                 }] as FieldSingleConfig['setters']
            })

            if (this.rawData.advanced?.component?.containerType !== 'Page') {
                extraPropsConfig.push({
                    type: 'field',
                    title: '取值路径',
                    name: 'pathToVal',
                    isExtra: true,
                    setters: [{ 
                        name: 'StringSetter',
                     }] as FieldSingleConfig['setters']
                })
            }

            if (this.rawData.advanced?.component?.isFormControl) {
                extraPropsConfig.push({
                    type: 'field',
                    title: 'name',
                    name: 'name',
                    isExtra: true,
                    setters: [{ 
                        name: 'StringSetter',
                     }] as FieldSingleConfig['setters']
                })
            }

            return extraPropsConfig
        }

        return {
            type: 'group',
            title: '属性',
            name: 'props',
            fields: [
                ...getExtraPropsConfig(),
                ...this.rawData.props.filter(prop => prop.name !== 'style').map(prop => ({
                    type: 'field' as 'field',
                    name: prop.name,
                    title: prop.description || prop.name,
                    setters: getSettersName(prop.setter),
                }))
            ]
        }
    }

    isCanInclude(componentSpec: ComponentSpec) {

        if (this.childWhitelist?.length === 0 && componentSpec.parentWhitelist?.length === 0) {
            return false
        }
        
        const notMatchChild = this.childWhitelist?.every((item: string) => {
            // 使用模糊匹配
            if (item.includes('*')) {
                item = item.replace(/\*/g,'.')
                const reg = new RegExp(item, 'i')
                return !reg.test(componentSpec.componentName)
            } else {
                return item !== componentSpec.componentName
            }
        })

        const notMatchParent = componentSpec.parentWhitelist?.every((item: string) => {
            // 使用模糊匹配
            if (item.includes('*')) {
                item = item.replace(/\*/g,'.')
                const reg = new RegExp(item, '')
                return !reg.test(this.componentName)
            } else {
                return item !== this.componentName
            }
        })

        if (notMatchChild || notMatchParent) {
            return false
        }

        return true
    }
}