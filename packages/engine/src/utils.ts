import { NpmInfo } from 'vitis-lowcode-types'

let guid = Date.now();
export function uniqueId(prefix = '') {
  return `${prefix}${(guid++).toString(36).toLowerCase()}`;
}

export function getComponentImplUrl(info: NpmInfo) {
  return `https://unpkg.com/${info.npm}@${info.version}/dist/index.min.js`
}

export function getComponentSpecUrl(info: NpmInfo) {
  return `https://unpkg.com/${info.npm}@${info.version}/asset/index.json`
}

export function getBaseAssets() {
  return {
    js: [
      'https://g.alicdn.com/code/lib/react/17.0.2/umd/react.production.min.js',
      'https://g.alicdn.com/code/lib/react-dom/17.0.2/umd/react-dom.production.min.js'
    ],
    css: []
  }
}

export function getComponentSetterMap(win: Window, bundle: {packageName: string, componentName: string, url: string}) {
  const name: string = bundle.packageName.replace(/-(\w)/g, (s,m) => {
    return m.toUpperCase()
  })

  return (win as any)[name].setters || {}
}