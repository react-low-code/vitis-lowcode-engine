import { ResultFile } from '../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [[], {
        name: '.eslintignore',
        ext: '',
        content: `# 忽略目录
        build/
        tests/
        demo/
        .ice/
        
        # node 覆盖率文件
        coverage/
        
        # 忽略文件
        **/*-min.js
        **/*.min.js
        `
    }]
}
