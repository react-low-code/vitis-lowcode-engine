declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare interface Window {
  VitisLowCodeEngine: {
    ASSET_UPDATED: symbol;
    plugins: any;
    material: any;
    setters: any;
    skeleton: any
  }
}
