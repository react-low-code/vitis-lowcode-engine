import { RegisteredSetter, SettersSpec } from 'vitis-lowcode-types'
import type innerSetters from '../setters'

export default class Setters implements SettersSpec{
    private readonly setters: innerSetters

    constructor(setters: innerSetters) {
        this.setters = setters
    }

    /**
     * 获取指定 setter
     * @param name 
     */
    getSetter(name: string): RegisteredSetter | undefined {
        if (this.hasSetter(name)) {
            return this.getAll().get(name)
        } else {
            return undefined
        }
    }

    /**
     * 是否有指定的 setter
     * @param name 
     * @returns 
     */
    hasSetter(name: string) {
        return this.setters.innerGetSetterMap().has(name)
    }

    /**
     * 获取所有的 setter
     */
     getAll(): Map<string, RegisteredSetter> {
        return this.setters.getSetterMap()
    }

    /**
     * 注册 setter
     * @param setter 
     */
    register(setter: RegisteredSetter | RegisteredSetter[]) {
        if (Array.isArray(setter)) {
            this.setters.register(setter)
        } else {
            this.setters.register([setter])
        }
    }

}