import { ResultFile } from '../../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [['src','hooks'], {
        name: 'useLifeCycles',
        ext: 'ts',
        content: `
        import { LifeCycles } from '../types'
        import { useEffect } from 'react'

        export default function useLifeCycles(lifeCycles: LifeCycles) {
            useEffect(() => {
                if (lifeCycles.beforeunload) {
                    const onbeforeunload = (e: Event) => {
                        try {
                            lifeCycles.beforeunload(e)
                        } catch (error) {
                            console.error(error)
                        }
                    }
                    window.addEventListener('beforeunload', onbeforeunload, false)
                }
        
                if (lifeCycles.load) {
                    const onload = (e: Event) => {
                        try {
                            lifeCycles.load(e)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    window.addEventListener('load', onload, false)
                }
        
                if (lifeCycles.unload) {
                    const onunload = (e: Event) => {
                        try {
                            lifeCycles.unload(e)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    window.addEventListener('unload', onunload, false)
                }
        
                if (lifeCycles.visibilitychange) {
                    const onvisibilitychange = (e: Event) => {
                        try {
                            lifeCycles.visibilitychange(e)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    document.addEventListener('visibilitychange', onvisibilitychange, false)
                }
            },[])
        }
        `
    }]
}
