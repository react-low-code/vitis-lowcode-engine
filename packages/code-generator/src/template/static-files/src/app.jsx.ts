import { ResultFile } from '../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [[], {
        name: 'app',
        ext: 'jsx',
        content: `
        import { runApp, config } from 'ice';
        const appConfig = {
          app: {
            rootId: 'ice-container',
          },
          router: {
            type: 'hash',
          }
        };
        
        runApp(appConfig);
          `
    }]
}
