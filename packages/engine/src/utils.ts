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
      'https://g.alicdn.com/code/lib/react-dom/17.0.2/umd/react-dom.production.min.js',
      'http://localhost:5555/js/simulator-renderer.js'
    ],
    css: ['http://localhost:5555/css/simulator-renderer.css']
  }
}

export function getComponentSetterMap(win: Window, bundle: {packageName: string, componentName: string}) {
  const name: string = bundle.packageName.replace(/-(\w)/g, (s,m) => {
    return m.toUpperCase()
  })

  return (win as any)[name].setters || {}
}

export function getComponentImplFromWin(win: Window, bundle: {packageName: string, componentName: string}) {
  const name: string = bundle.packageName.replace(/-(\w)/g, (s,m) => {
    return m.toUpperCase()
  })

  //如果组件包中存在设置器
  if ((win as any)[name].setters) {
    return (win as any)[name].default
  } else {
    return (win as any)[name]
  }
}