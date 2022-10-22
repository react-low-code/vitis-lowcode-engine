import { RegisteredSetter } from 'vitis-lowcode-types'

export default class Setters {
    private setterMap: Map<string, RegisteredSetter>  = new Map()

    getSetterMap() {
        return new Map(this.setterMap)
    }

    innerGetSetterMap() {
        return this.setterMap
    }

    register(setters: RegisteredSetter[]) {
        setters.map(setter => {
            if (this.setterMap.has(setter.name)) {
                console.warn(`设置器 ${setter.name} 已经存在，现在将覆盖已有的`)
            }

            this.setterMap.set(setter.name, setter)
        })
    }
}