import mongoose from "mongoose";

export function getObjectKeys<T>(Object: T) {
    const keys: (keyof T)[] = [];
    for (const objectKey in Object) {
        keys.push(objectKey);
    }
    return keys;
}

const pluralize = mongoose.pluralize() as (str: string) => string;
export const getMongooseCollectionName = (str: string) => pluralize(str).replaceAll(" ", "")