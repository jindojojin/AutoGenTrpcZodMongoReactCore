import mongoose from "mongoose";

export const getMongooseCollectionName = (str: string) => pluralize(str).replaceAll(" ", "")
const pluralize = mongoose.pluralize() as (str: string) => string;
