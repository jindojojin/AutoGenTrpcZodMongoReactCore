import {Schema, SchemaDefinition, SchemaDefinitionType} from "mongoose";
import {BASIC_TYPE, DataType, isBasicType, isFileType,} from "../../../share/types/DataTypes";
import _ from "lodash";
import {ISchemaDefinition} from "../../../share/types/ISchemaDefinition";
import {SFileCollectionName} from "../../file-storage/FileManager";
import {SystemUserCollectionName} from "../../../share/constants/database_fields";
import {getSchemaName} from "../../../share/SchemaUtils";

import {getObjectKeys} from "../../../share/CommonFunctions";
import {SCHEMA_TYPE} from "../../../schemas/SchemaTypes";

function getMongoType(type: DataType): any {
  if (Array.isArray(type)) {
    return getMongoType(type[0]);
  } else {
    if (isBasicType(type)) {
      switch (type) {
        case BASIC_TYPE.DATE:
        case BASIC_TYPE.TIME:
          return { type: Schema.Types.Date };
        case BASIC_TYPE.TEXT:
          return { type: Schema.Types.String };
        case BASIC_TYPE.NUMBER:
          return { type: Schema.Types.Number };
        case BASIC_TYPE.ENUM:
          return { type: Schema.Types.String };
        case BASIC_TYPE.BOOLEAN:
          return { type: Schema.Types.Boolean };
        default:
          return { type: Schema.Types.Mixed };
      }
    } else {
      return {
        type: Schema.Types.ObjectId,
        ref: isFileType(type)
          ? SFileCollectionName
          : getSchemaName(type as SCHEMA_TYPE).SchemaName,
      };
    }
  }
}

export function getSchemaFromFieldConfigs<T>(
  fieldConfigs: ISchemaDefinition<T>,
) {
  const schema = getObjectKeys(fieldConfigs).reduce(
    (obj, field) => {
      const fieldConfig = _.omitBy(
        {
          ...fieldConfigs[field],
          ...getMongoType(fieldConfigs[field].type),
          enum: fieldConfigs[field].enum?.length
            ? fieldConfigs[field].enum
            : undefined,
          sparse: fieldConfigs[field].unique ?? undefined, //to be unique unless it is not defined
        },
        _.isNil,
      );
      return {
        ...obj,
        [field]: Array.isArray(fieldConfigs[field].type)
          ? [fieldConfig]
          : fieldConfig,
      };
    },
    {
      lastModifyBy: {
        type: Schema.Types.ObjectId,
        ref: SystemUserCollectionName,
      },
    } as unknown as SchemaDefinition<SchemaDefinitionType<T>>,
  );
  return new Schema(schema as SchemaDefinition<SchemaDefinitionType<T>>, {
    timestamps: true,
    overwriteModels: true,
  });
}