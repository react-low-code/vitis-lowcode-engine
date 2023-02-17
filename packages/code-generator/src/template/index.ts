import { ResultDir, IProjectTemplate } from '../types';
import { generateStaticFiles } from './static-files';

import pluginPackageJSON from '../plugins/packageJSON'
import pluginHtmlEntry from '../plugins/htmlEntry'
import pluginService from '../plugins/service'

const template: IProjectTemplate = {
  slots: {
    pages: {
      path: ['src', 'pages'],
      plugins: []
    },
    htmlEntry: {
      path: ['public'],
      fileName: 'index',
      ext: 'html',
      plugins: [pluginHtmlEntry]
    },
    packageJSON: {
      path: [],
      fileName: 'package',
      ext: 'json',
      plugins: [pluginPackageJSON]
    },
    service: {
      path: ['src','service'],
      fileName: 'index',
      ext: 'ts',
      plugins: [pluginService]
    },
  },

  generateTemplate(): ResultDir {
    return generateStaticFiles();
  },
};

export default template;
