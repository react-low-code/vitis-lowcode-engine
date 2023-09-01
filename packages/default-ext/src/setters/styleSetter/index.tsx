import * as React from 'react';
import { SetterCommonProps } from 'vitis-lowcode-types'
import Layout from './pro/layout';
import Position from './pro/position';
import Font from './pro/font';
import Border from './pro/border';
import Background from './pro/background';
import CssCode from './components/css-code';
import { StyleData } from './utils/types';
import Icon from './components/icon';
import { transformStringToCSSProperties,transformCSSPropertiesToString } from './utils'

import './index.less';
interface StyleSetterProps extends SetterCommonProps{
  value: string | undefined;
}

interface State {
  styleData: React.CSSProperties;
  cssCodeVisiable: boolean;
  initFlag: boolean
}

class StyleSetter extends React.PureComponent<StyleSetterProps> {
  static defaultProps = {
    // 默认单位
    unit: 'px',
    // 默认计算尺寸缩放
    placeholderScale: 1,
  };

  state: State = { styleData: {}, cssCodeVisiable: false, initFlag: false };

  componentDidMount() {
    const { value } = this.props;
    if (value) {
      this.setState({
        styleData: transformStringToCSSProperties(value),
      });
    }

    this.setState({
      initFlag: true,
    });
  }

  changeCssCodeVisiable = (visible: boolean) => {
    this.setState({
      cssCodeVisiable: !visible,
    });
  };

  /**
   * style更改
   * @param styleKey
   * @param value
   */
  onStyleChange = (styleDataList: Array<StyleData>) => {
    let styleData: React.CSSProperties | any = Object.assign({}, this.state.styleData);
    styleDataList &&
      styleDataList.map((item) => {
        if (item.value == undefined || item.value == null) {
          delete styleData[item.styleKey];
        } else {
          styleData[item.styleKey] = item.value;
        }
      });

    this.onStyleDataChange(styleData)
  };

  onStyleDataChange = (styleData: React.CSSProperties) => {
    this.setState({
      styleData,
    });
    const { onChange } = this.props;
    const str = transformCSSPropertiesToString(styleData)
    console.log(str)
    onChange && onChange(str);
  };

  render() {
    const { styleData, cssCodeVisiable, initFlag } = this.state;
    console.log('styleData', styleData);
    return (
        <div className="lowcode-setter-style-v2">
          <div className="top-bar">
            <div
              onClick={() => this.changeCssCodeVisiable(false)}
              className={cssCodeVisiable ? 'top-icon-active' : 'top-icon'}
            >
              <Icon type="icon-CSS"></Icon>
            </div>
          </div>
          <Layout onStyleChange={this.onStyleChange} styleData={styleData} {...this.props}></Layout>

          <Font onStyleChange={this.onStyleChange} styleData={styleData} {...this.props}></Font>
          <Background
            onStyleChange={this.onStyleChange}
            styleData={styleData}
            {...this.props}
          ></Background>
          {/* <Position
            onStyleChange={this.onStyleChange}
            styleData={styleData}
            {...this.props}
          ></Position> */}
          <Border onStyleChange={this.onStyleChange} styleData={styleData} {...this.props}></Border>
          {initFlag && (
            <CssCode
              visible={cssCodeVisiable}
              styleData={styleData}
              onStyleDataChange={this.onStyleDataChange}
              changeCssCodeVisiable={this.changeCssCodeVisiable}
            ></CssCode>
          )}
        </div>
    );
  }
}

export default {
  view: StyleSetter,
  name: "StyleSetter"
}