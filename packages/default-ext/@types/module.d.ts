declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}
declare module 'cssjson';

declare interface Window {
  VitisLowCodeEngine: {
    ASSET_UPDATED: symbol;
    DRAG_OVER: symbol;
    SCHEMA_UPDATED: symbol;
    plugins: any;
    material: any;
    setters: any;
    skeleton: any;
    project: any;
    dragon: any;
  }
}
