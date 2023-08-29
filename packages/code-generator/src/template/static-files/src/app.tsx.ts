import { ResultFile } from '../../../types/file'

export default function getFile(): [string[], ResultFile] {
  return [['src'], {
    name: 'app',
    ext: 'tsx',
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
