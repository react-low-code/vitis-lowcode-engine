import { ResultFile } from '../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [[], {
        name: '.gitignore',
        ext: '',
        content: `# See https://help.github.com/ignore-files/ for more about ignoring files.

        # dependencies
        node_modules/
        
        # production
        build/
        dist/
        tmp/
        lib/
        
        # misc
        .idea/
        .happypack
        .DS_Store
        *.swp
        *.dia~
        .ice
        
        npm-debug.log*
        yarn-debug.log*
        yarn-error.log*
        index.module.scss.d.ts
        `
    }]
}
