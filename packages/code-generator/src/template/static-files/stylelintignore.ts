import { ResultFile } from '../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [[], {
        name: '.stylelintignore',
        ext: '',
        content: `# 忽略目录
        build/
        tests/
        demo/
        
        # node 覆盖率文件
        coverage/
        `
    }]
}
