import { ComponentSpecRaw } from 'vitis-lowcode-types'

export default class ComponentSpec {
    // todo
    propsConfigure: any;
    rawData: ComponentSpecRaw

    constructor(componentSpecRaw: ComponentSpecRaw) {
        this.rawData = componentSpecRaw
        this.parseRawData()
    }

    parseRawData() {

    }
}