import { ResultFile } from '../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [['src'], {
        name: 'typings.d',
        ext: 'ts',
        content: `
        declare module '*.module.less' {
            const classes: { [key: string]: string };
            export default classes;
          }
          
          declare module '*.module.css' {
            const classes: { [key: string]: string };
            export default classes;
          }
          
          declare module '*.module.scss' {
            const classes: { [key: string]: string };
            export default classes;
          }
          `
    }]
}
