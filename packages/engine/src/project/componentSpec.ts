import { ComponentSpecRaw, NodeSchema, SetterConfig } from 'vitis-lowcode-types'
import { FieldConfig, FieldGroupConfig, FieldSingleConfig } from '../types'

export default class ComponentSpec {
    configure: FieldConfig[] = [];
    rawData: ComponentSpecRaw
    extraProps: NodeSchema['extraProps']

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

    private get hasDataSource() {
        return this.rawData.advanced?.component?.isContainer
    }

    private get hasLinkage() {
        return this.hasHiddenRule
        || this.isFormControl
    }

    private get isFormControl() {
        return this.rawData.advanced?.component?.isFormControl
    }

    private get hasHiddenRule() {
        return this.rawData.advanced?.component?.isContainer && this.rawData.advanced.component.containerType !== 'Page' 
    }

    private get type () {
        return this.rawData.group === 'template' ? 'template' : 'component'
    }

    /**
     * 这个是初始 schema
     */
    get schema(): NodeSchema | NodeSchema[]{
        // 模板的第一层不表示任何组件，从第二层开始才表示组件
        if (this.type === 'template') {
            // 从第二层开始
            return (this.rawData.children || []).map(child => {
                const childSpec = new ComponentSpec(child)
                return childSpec.schema as NodeSchema
            })

        } else {
            const props: {[attr: string]: any} = {}
            this.rawData.props.forEach(prop => {
                props[prop.name] = prop.defaultValue
            })
            const supports = this.rawData.advanced?.supports
            if (supports?.styles) {
                props['style'] = ''
            }
            const children = (this.rawData.children || []).map((child) => {
                const childSpec = new ComponentSpec(child)
                return childSpec.schema as NodeSchema
            })

            return {
                componentName: this.componentName,
                props,
                extraProps: this.extraProps,
                isContainer: !!this.rawData.advanced?.component?.isContainer,
                children,
                containerType: this.rawData.advanced?.component?.containerType || undefined,
                packageName: this.rawData.packageName,
                isFormControl: this.rawData.advanced?.component?.isFormControl
            }
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

        if (this.hasDataSource) {
            this.extraProps.dataSource = {
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
        }

        if (this.hasHiddenRule) {
            this.extraProps.isHidden = {
                type: 'JSFunction',
                value: 'function isHidden(pageData, formData){return false}'
            }
        }

        if (this.isFormControl) {
            this.extraProps.isDisabled = {
                type: 'JSFunction',
                value: 'function isHidden(pageData, formData){return false}'
            }

            this.extraProps.getValue = undefined
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
                        name: 'style',
                        setters: [{ name: 'StyleSetter' }] as FieldSingleConfig['setters']
                    }
                ]
            })
        }

        if (this.hasDataSource) {
            this.configure.push({
                type: 'group',
                title: '数据源',
                name: 'dataSource',
                fields: [
                    {
                        type: 'field',
                        title: 'tip',
                        name: 'tip',
                        isExtra: true,
                        setters: [{ 
                            name: 'TextSetter', 
                            props: {
                                defaultValue: '这里的配置将发送网络请求，它返回的数据优先级高于从父容器取值',
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
                        title: '响应处理器',
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

        if (this.hasLinkage) {
            this.configure.push(this.getLinkageConfig())
        }

    }

    private getPropsConfig = (): FieldGroupConfig => {
        const getSettersName = (setterConfig: SetterConfig | SetterConfig[]) => {
            if (!Array.isArray(setterConfig)) {
                setterConfig = [setterConfig]
            }

            return setterConfig.map(config => ({
                name: config.isUseSelf ? this.rawData.packageName + '/' + config.name : config.name,
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

    private getLinkageConfig = (): FieldGroupConfig => {
        const getHiddenRule = (): FieldSingleConfig | undefined => {
            if (this.hasHiddenRule) {
                return {
                    type: 'field',
                    title: '隐藏',
                    name: 'isHidden',
                    isExtra: true,
                    setters: [{name: 'FunctionSetter'}]
                }
            }
        }

        const getDisableRule = (): FieldSingleConfig | undefined => {
            if (this.isFormControl) {
                return {
                    type: 'field',
                    title: '禁用',
                    name: 'isDisabled',
                    isExtra: true,
                    setters: [{name: 'FunctionSetter'}]
                }
            } 
        }

        const getValueRule = (): FieldSingleConfig | undefined => {
            if (this.isFormControl) {
                return {
                    type: 'field',
                    title: '求值',
                    name: 'getValue',
                    isExtra: true,
                    setters: [{name: 'FunctionSetter'}]
                }
            } 
        }

        const hiddenRule = getHiddenRule()
        const disableRule = getDisableRule()
        const valueRule = getValueRule()
        const config: FieldGroupConfig = {
            type: 'group',
            title: '联动',
            name: 'linkage',
            fields: []
        }

        if (hiddenRule) {
            config.fields.push(hiddenRule)
        }
        if (disableRule) {
            config.fields.push(disableRule)
        }
        if (valueRule) {
            config.fields.push(valueRule)
        }
        return config
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