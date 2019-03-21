export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export default class Utils {

  static pluck<T, K extends keyof T>(objs: T, ...keys: K[]): Pick<T, K> {
    return keys.reduce((result, key) =>
      Object.assign(result, { [key as string]: key in objs ? objs[key] : null }), {}) as Pick<T, K>;
  }

  static omit<T extends any, K extends keyof T>(objs: T, ...keys: K[]): Omit<T, K> {
    return keys.reduce((result, key) => {
      delete result[key as string];
      return result;
    }, objs) as Omit<T, K>;
  }

}