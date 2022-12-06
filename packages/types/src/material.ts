import { PropRaw } from './Props'
import type EventEmitter from 'eventemitter3';

export interface MaterialSpec extends EventEmitter{
  load(infos: NpmInfo[]): Promise<boolean[]> 
  addComponentSpec(packageName: string, spec: ComponentSpecRaw): void;
  has(packageName: string): boolean
  get(packageName: string): ComponentSpecRaw | undefined
  getAll(): Map<string, ComponentSpecRaw>
}

export interface NpmInfo {
    npm: string;
    version: string;
}

export interface ComponentSpecRaw {
  componentName: string;
  packageName: string;
  title: string;
  iconUrl: string;
  description: string;
  docUrl?: string;
  version: string;
  props: PropRaw[];
  // 描述该组件位于组件面板中哪个区域
  group?: "base"|"layout"|"subjoin";
  advanced?: {
    // 组件的嵌套规则
    nestingRule?: {
      // 父级组件白名单
      // 非容器组件必须放置在容器组件中
      parentWhitelist?: string[];
      // 子组件白名单。
      // 空数组则说明其他组件不能放置在该组件中, undefined 则说明其他组件能放置在该组件中
      childWhitelist?: string[];
    };
    supports?: {
      // 是否能配置样式
      styles?: boolean;
      // 支持的事件列表，空数组意味着不支持任何事件
      events?: string[]
    },
    component?: {
      // 是否是容器
      isContainer?: boolean;
      // 容器类型
      containerType?: 'Layout'|'Data'|'Page';
      // 是否是表单组件
      isFormControl?: boolean
    }
  }
}