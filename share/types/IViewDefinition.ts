import { SCHEMA_TYPE } from "../../schemas/SchemaTypes"
import { ISchemaDefinition } from "./ISchemaDefinition"

export type IViewDefinition = {
    viewOn: SCHEMA_TYPE,
    pineline: any[],
    schema: ISchemaDefinition
}