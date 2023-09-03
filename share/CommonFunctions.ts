export function getObjectKeys<T>(Object: T) {
    const keys: (keyof T)[] = [];
    for (const objectKey in Object) {
        keys.push(objectKey);
    }
    return keys;
}