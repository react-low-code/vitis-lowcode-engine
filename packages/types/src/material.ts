export interface MaterialSpec {
  load(infos: NpmInfo[]): Promise<boolean[]> 
  has(packageName: string): boolean
}

export interface NpmInfo {
    npm: string;
    version: string;
}

export interface ComponentSpecMeta {

}