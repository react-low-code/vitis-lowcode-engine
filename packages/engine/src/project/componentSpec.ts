import { ComponentSpecRaw, NodeSchema, SetterConfig } from 'vitis-lowcode-types'
import { FieldConfig, FieldGroupConfig, FieldSingleConfig } from '../types'

export default class ComponentSpec {
    configure: FieldConfig[] = [];
    rawData: ComponentSpecRaw

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

        return {
            componentName: this.componentName,
            props,
            isContainer: !!this.rawData.advanced?.component?.isContainer,
            children: [],
            containerType: this.rawData.advanced?.component?.containerType || undefined,
            packageName: this.rawData.packageName
        }
    }

    private parseRawData = () => {
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
    }

    getPropsConfig = (): FieldGroupConfig => {
        const getSettersName = (setterConfig: SetterConfig | SetterConfig[]) => {
            if (!Array.isArray(setterConfig)) {
                setterConfig = [setterConfig]
            }

            return setterConfig.map(config => ({
                name: config.isUseSelf ? this.rawData.packageName + '/' + config.setterName : config.setterName,
                props: config.props
            }))
        }

        return {
            type: 'group',
            title: '属性',
            name: 'props',
            fields: [
                {
                    type: 'field',
                    title: 'ID',
                    name: 'id',
                    setters: [{ name: 'StringSetter' }] as FieldSingleConfig['setters'],
                    initialValue: {
                        type: 'JSFunction',
                        value: "node => node.id"
                    }
                },
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