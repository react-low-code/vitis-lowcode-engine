import { makeAutoObservable } from 'mobx';

import ComponentSpec from './componentSpec'
import { innerMaterial } from '../shell'
export default class Designer {
    componentSpecMap: Map<string, ComponentSpec> = new Map()

    constructor() {
        makeAutoObservable(this);
    }

    buildComponentSpecMap(packageNames: string[]) {
        packageNames.forEach(packageName => {
            const result = innerMaterial.getComponentSpecRaw(packageName)

            if (result) {
                this.componentSpecMap.set(packageName, new ComponentSpec(result))
            }
        })
    }
}
