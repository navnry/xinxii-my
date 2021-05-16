import { PluginFunction } from "vue";

declare class UniStorage {
  static install:PluginFunction<never>;
  get(name: string, version?: string) : any;
  getAll(version?: string): object;
  set(name: string, value: any, expire?: number);
  remove(name: string): boolean;
  on(name: string, callback: (newValue: any, oldValue: any) =>{});
  once(name: string, callback: (newValue: any, oldValue: any) =>{});
  off(name, callback?:(newValue: any, oldValue: any) =>{});
}
export default UniStorage;