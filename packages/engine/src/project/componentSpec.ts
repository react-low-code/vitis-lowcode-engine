import { ComponentSpecRaw } from 'vitis-lowcode-types'

export default class ComponentSpec {
    // todo
    propsConfigure: any;
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

    parseRawData() {

    }

    isCanDropTo(componentSpec: ComponentSpec) {
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