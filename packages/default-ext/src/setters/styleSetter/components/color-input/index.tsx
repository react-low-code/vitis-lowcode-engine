import * as React from 'react';
import { Input, Popover } from 'antd';
import { StyleData, onStyleChange } from '../../utils/types';
import { SketchPicker } from 'react-color';

import './index.less';
interface ColorInputProps {
  styleKey: string;
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  inputWidth?: string;
}

interface state {
  width: number;
}
export default class ColorSetter extends React.Component<ColorInputProps, state> {
  constructor(props: ColorInputProps) {
    super(props);
    this.state = {
      width: 50,
    };
  }
  componentDidMount() {
    this.screenChange();
    this.changeWidth();
    // const { onChange, value, defaultValue } = this.props;
    // if (value == undefined && defaultValue) {
    //   onChange(defaultValue);
    // }
  }
  /**
   * 屏幕分辨率监听
   */
  screenChange = () => {
    window.addEventListener('resize', this.changeWidth);
  };
  /**
   * 屏幕分辨率 变换 =>  改变冒泡框的位置
   */
  changeWidth = () => {
    this.setState({ width: document.body.clientWidth < 1860 ? -92 : -138 });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.changeWidth);
  }

  inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onStyleChange, styleKey } = this.props;
    const color = event.target.value
    if (color == '') {
      onStyleChange([
        {
          styleKey,
          value: undefined,
        },
      ]);
    }
  };

  handleChange = (color: any) => {
    const { onStyleChange, styleKey } = this.props;
    const { rgb, hex } = color;
    const { r, g, b, a } = rgb;
    if (a === 1) {
      onStyleChange([
        {
          styleKey,
          value: hex,
        },
      ]);
    } else {
      onStyleChange([
        {
          styleKey,
          value: `rgba(${r},${g},${b},${a})`,
        },
      ]);
    }
  };

  render() {
    const { styleKey, styleData, inputWidth = '108px' } = this.props;
  
    return (
      <Popover
        placement="topRight"
        style={{ padding: 0 }}
        trigger="click"
        content={<SketchPicker width="250px" color={styleData[styleKey]} onChange={this.handleChange} />}
      >
        <Input
          className="lowcode-setter-color"
          style={{ width: inputWidth }}
          allowClear={true}
          addonBefore={<div className="color-box" style={{ backgroundColor: styleData[styleKey] }} />}
          onChange={this.inputChange}
          value={styleData[styleKey]}
        />
        
      </Popover>
    );
  }
}
