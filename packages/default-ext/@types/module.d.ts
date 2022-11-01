declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare interface Window {
  VitisLowCodeEngine: {
    ASSET_UPDATE: symbol;
    plugins: any;
    material: any;
    project: any;
    setters: any;
    skeleton: any
  }
}
