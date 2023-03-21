import { useEffect } from 'react'
import { PageSchema } from 'vitis-lowcode-types'
import { transformStringToFunction } from '../utils'

export default function useLifeCycles(lifeCycles: PageSchema['lifeCycles']) {
    useEffect(() => {
        let onbeforeunload = (e: Event) => {}
        let onload = (e: Event) => {}
        let onunload = (e: Event) => {}
        let onvisibilitychange = (e: Event) => {}

        if (lifeCycles.beforeunload && lifeCycles.beforeunload.value) {
            const func = transformStringToFunction(lifeCycles.beforeunload.value)
            
            if (typeof func === 'function') {
                onbeforeunload = (e: Event) => {
                    try {
                        func(e)
                    } catch (error) {
                        console.log(error)
                    }
                }
                window.addEventListener('beforeunload', onbeforeunload, false)
            }
        }

        if (lifeCycles.load && lifeCycles.load.value) {
            const func = transformStringToFunction(lifeCycles.load.value)
            
            if (typeof func === 'function') {
                onload = (e: Event) => {
                    try {
                        func(e)
                    } catch (error) {
                        console.log(error)
                    }
                }
                window.addEventListener('load', onload, false)
            }
        }

        if (lifeCycles.unload && lifeCycles.unload.value) {
            const func = transformStringToFunction(lifeCycles.unload.value)
            
            if (typeof func === 'function') {
                onunload = (e: Event) => {
                    try {
                        func(e)
                    } catch (error) {
                        console.log(error)
                    }
                }
                window.addEventListener('unload', onunload, false)
            }
        }

        if (lifeCycles.visibilitychange && lifeCycles.visibilitychange.value) {
            const func = transformStringToFunction(lifeCycles.visibilitychange.value)
            
            if (typeof func === 'function') {
                onvisibilitychange = (e: Event) => {
                    try {
                        func(e)
                    } catch (error) {
                        console.log(error)
                    }
                }
                document.addEventListener('visibilitychange', onvisibilitychange, false)
            }
        }

        return () => {
            document.removeEventListener('visibilitychange', onvisibilitychange, false)
            window.removeEventListener('unload', onunload, false)
            window.removeEventListener('load', onload, false)
            window.removeEventListener('beforeunload', onbeforeunload, false)
        }
    },[lifeCycles.beforeunload, lifeCycles.load, lifeCycles.unload, lifeCycles.visibilitychange])
}