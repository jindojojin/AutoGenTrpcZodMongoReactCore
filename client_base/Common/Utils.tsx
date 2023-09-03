export function getObjectKeys<T, K extends any = keyof T>(Object: T) {
  const keys: K[] = [];
  for (const objectKey in Object) {
    keys.push(objectKey as unknown as K);
  }
  return keys;
}

export function showIf(condition: any, component: JSX.Element) {
  return condition ? component : <></>;
}