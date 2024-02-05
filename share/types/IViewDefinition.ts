import {SCHEMA_TYPE} from "../../schemas/SchemaTypes"
import {ISchemaDefinition} from "./ISchemaDefinition"
import {DataType} from "./DataTypes";
import {VIEW_TYPE} from "../../views/ViewTypes";

export type IViewDefinition = {
    viewOn: SCHEMA_TYPE,
    pineline: any[],
    schema: ISchemaDefinition
}
export type APIParameters = {
    [k: string]: { type: DataType, optional?: boolean, defaultValue?: any }
}
export type FormApiDefinition =
    {
        targetSchema: SCHEMA_TYPE,
        parameters
            :
            APIParameters
        schema: ISchemaDefinition,
    }
export type TableApiDefinition = {
    viewOn: SCHEMA_TYPE | VIEW_TYPE,
    parameters: APIParameters,
    schema: ISchemaDefinition,
    pineline: (...params: any[]) => any[]
}
