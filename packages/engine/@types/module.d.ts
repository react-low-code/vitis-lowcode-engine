declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare interface Window {
  LCSimulatorHost: any
  SimulatorRenderer: any
}
