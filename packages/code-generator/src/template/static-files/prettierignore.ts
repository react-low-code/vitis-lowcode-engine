import { ResultFile } from '../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [[], {
        name: '.prettierignore',
        ext: '',
        content: `build/
        tests/
        demo/
        .ice/
        coverage/
        **/*-min.js
        **/*.min.js
        package-lock.json
        yarn.lock`
    }]
}
