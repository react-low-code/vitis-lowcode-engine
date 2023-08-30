import { StyleData } from './types';
import { toCSS, toJSON } from 'cssjson';


export function removeUnit(value: string) {
  if (value != undefined && value != null) {
    return parseInt(value);
  }

  return undefined;
}

export function addUnit(value: number | string | undefined, unit: string) {
  if (value != undefined && value != null) {
    return value + unit;
  } else {
    return undefined;
  }
}

export function isEmptyValue(value?: string | number | boolean | null) {
  if (value == undefined || value == null) {
    return true;
  }

  return false;
}

/**
 * 将驼峰写法改成xx-xx的css命名写法
 * @param styleKey
 */
export function toLine(styleKey: string) {
  return styleKey.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function toHump(name: String) {
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

/**
 * rgba转16进制
 * @param color
 */
export function hexify(color: string) {
  const values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');
  const a = parseFloat(values[3]);
  const r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255);
  const g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255);
  const b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
  return (
    '#' +
    ('0' + r.toString(16)).slice(-2) +
    ('0' + g.toString(16)).slice(-2) +
    ('0' + b.toString(16)).slice(-2)
  );
}

export function parseToCssCode(styleData: StyleData) {
  const parseStyleData: any = {};
  const styleDataEntries = Object.entries(styleData)
  for (const [key, value] of styleDataEntries) {
    parseStyleData[toLine(key)] = value;
  }

  const cssJson = {
    children: {
      '#main': {
        children: {},
        attributes: parseStyleData,
      },
    },
  };

  return toCSS(cssJson);
}

export function parseToStyleData(cssCode: string) {
  const styleData:{[attr: string]:any} = {};
  try {
    const cssJson = toJSON(cssCode);
    const cssJsonData = cssJson?.children?.['#main']?.attributes;
    for (const key in cssJsonData) {
      styleData[toHump(key)] = cssJsonData[key];
    }
    // 转化key
  } catch (e:unknown) {
    console.error(e);
  }

  return styleData;
}

export function transformStringToCSSProperties(str: string) {
  const result: any = {}
  str = str.replace(/\S\s/g,'')
  str.split(';').forEach(item => {
    const [key, value] = item.split(':')
    if (key && value) {
      result[key] = value
    }
  })
  
  return result as React.CSSProperties
}

export function transformCSSPropertiesToString(styleData: React.CSSProperties) {
  let cssString = ''
  const styleDataEntries = Object.entries(styleData)
  for (const [key, element] of styleDataEntries) {
    cssString +=`${key}:${element};`
  }

  return cssString
}
