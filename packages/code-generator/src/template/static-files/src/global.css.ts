import { ResultFile } from '../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [['src'], {
        name: 'global',
        ext: 'css',
        content: `
        body {
            -webkit-font-smoothing: antialiased;
          }
          #ice-container {
            height: 100%;
          }
          `
    }]
}
