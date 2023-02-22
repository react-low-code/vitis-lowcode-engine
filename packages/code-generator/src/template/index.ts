import { ResultDir, IProjectTemplate } from '../types';
import { generateStaticFiles } from './static-files';

import pluginPackageJSON from '../plugins/packageJSON'
import pluginHtmlEntry from '../plugins/htmlEntry'
import pluginService from '../plugins/service'
import pluginPage from '../plugins/page'
import pluginLayoutContainer from '../plugins/LayoutContainer'
import pluginFormControl from '../plugins/FormControl'
import pluginUIControl from '../plugins/UIControl';

const template: IProjectTemplate = {
  fixedSlots: {
    pages: {
      path: ['src', 'pages','Home'],
      plugins: [pluginPage]
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

  dynamicSlots: {
    layoutContainer: {
      plugins: [pluginLayoutContainer]
    },
    dataContainer: {
      plugins: [pluginLayoutContainer]
    },
    UIControl: {
      plugins: [pluginUIControl]
    },
    formControl: {
      plugins: [pluginFormControl]
    }
  },

  generateTemplate(): ResultDir {
    return generateStaticFiles();
  },
};

export default template;
