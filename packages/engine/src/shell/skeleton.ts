import { SkeletonSpec, WidgetConfig, WidgetConfigArea } from 'vitis-lowcode-types'
import type InnerSkeleton from '../skeleton'
export default class Skeleton implements SkeletonSpec {
    private readonly skeleton: InnerSkeleton

    constructor(skeleton: InnerSkeleton) {
        this.skeleton = skeleton
    }

    
    add(config: WidgetConfig) {
        return this.skeleton.add(config)
    }

    remove(area: WidgetConfigArea, name: string) {
        return this.skeleton.remove(area, name)
    }
}