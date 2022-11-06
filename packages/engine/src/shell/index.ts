import InnerSetters from '../setters'
import Setters from './setters'
import InnerPluginManger from '../plugins'
import PluginManager from './plugins'
import InnerMaterial from '../material'
import Material from './material'
import InnerSkeleton from '../skeleton'
import Skeleton from './skeleton'
import InnerProject from '../project'
import Project from './project'

export const observableSkeleton = new InnerSkeleton()
export const observableProject = new InnerProject()
export const innerMaterial = new InnerMaterial()

export const setters = new Setters(new InnerSetters())
export const plugins = new PluginManager(new InnerPluginManger())
export const material = new Material(innerMaterial)
export const skeleton = new Skeleton(observableSkeleton)
export const project = new Project(observableProject)
