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
        return undefined
    }

    /**
     * 获取所有的 setter
     */
     getAll(): Map<string, RegisteredSetter> {
        return this.setters.getSetterMap()
    }

    /**
     * 注册 setter
     * @param name 
     * @param setter 
     */
    register(name: string, setter: RegisteredSetter) {
        
    }

}