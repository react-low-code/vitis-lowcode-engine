import { makeAutoObservable,  } from 'mobx';
import { ComponentType } from 'react'
import { DesignerSpec } from 'vitis-lowcode-types'

import ComponentSpec from './componentSpec'
import { innerMaterial } from '../shell'
export default class Designer implements DesignerSpec{
    componentSpecMap: Map<string, ComponentSpec> = new Map()
    componentImplMap: Map<string, ComponentType> = new Map()

    constructor() {
        makeAutoObservable(this);
    }

    buildComponentSpecMap = (packageNames: string[]) => {
        packageNames.forEach(packageName => {
            const result = innerMaterial.getComponentSpecRaw(packageName)

            if (result) {
                this.componentSpecMap.set(packageName, new ComponentSpec(result))
            }
        })
    }

    addComponentsImpl = (componentMap: Map<string,ComponentType >) => {
        for (const [name, component ] of componentMap) {
            this.addComponentImpl(name, component)
        }

        this.componentImplMap = new Map(this.componentImplMap)
    }

    private addComponentImpl = (name: string, component: ComponentType) => {
        if (this.componentImplMap.has(name)) {
            console.error(`${name} 的实现已经存在，即将重置！！！`)
        }
        this.componentImplMap.set(name, component)
    }
}
