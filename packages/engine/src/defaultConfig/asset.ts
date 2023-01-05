import { ComponentSpecRaw } from 'vitis-lowcode-types'

export const PageComponentsSpec: ComponentSpecRaw = {
    componentName: 'Page',
    packageName: 'Page',
    title: '页面',
    iconUrl: '',
    description: '这是一个页面容器',
    version: '0.0.1',
    props: [],
    group: 'base',
    advanced: {
        nestingRule: {
            parentWhitelist: [],
            childWhitelist: ['Layout*','Row']
        },
        supports: {
            styles: true,
        },
        component: {
            isContainer: true,
            containerType: 'Page',
            isFormControl: false
        }
    }
}