import InnerSetters from '../setters'
import Setters from './setters'
import InnerPluginManger from '../plugins'
import PluginManager from './plugins'
import InnerMaterial from '../material'
import Material from './material'
import InnerSkeleton from '../skeleton'
import Skeleton from './skeleton'
import Project from './project'

export const setters = new Setters(new InnerSetters())
export const plugins = new PluginManager(new InnerPluginManger())
export const material = new Material(new InnerMaterial())
export const skeleton = new Skeleton(new InnerSkeleton())
export const project = new Project()
