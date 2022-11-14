import { ReactInstance } from "react"

class ReactInstanceCollector {
    private reactInstanceMap: Map<string, ReactInstance | null> = new Map()

    mount(id: string, instance: ReactInstance | null){
        this.reactInstanceMap.set(id, instance)
    }
}

export default new ReactInstanceCollector()