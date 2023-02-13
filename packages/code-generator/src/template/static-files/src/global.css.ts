import { ResultFile } from '../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [[], {
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
