import { RegisteredSetter } from 'vitis-lowcode-types'

export default class Setters {
    private setterMap: Map<string, RegisteredSetter>  = new Map()

    getSetterMap() {
        return new Map(this.setterMap)
    }
}