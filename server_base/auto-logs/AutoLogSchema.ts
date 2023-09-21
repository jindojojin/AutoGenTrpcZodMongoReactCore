import {ISchemaDefinition} from "../../share/types/ISchemaDefinition";
import {BASIC_TYPE} from "../../share/types/DataTypes";

import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

import {GenConfig} from "../../schemas";

interface AutoLogGenConfig<D, T> {
  dataSchema: D;
  dataGenConfig: GenConfig;
  logSchema?: T;
}

export function withAutoLog<D extends SCHEMA_TYPE, L extends SCHEMA_TYPE>(
  config: AutoLogGenConfig<D, L>,
): Record<L | D, GenConfig> {
  if (!config.logSchema)
    return {
      [config.dataSchema]: config.dataGenConfig,
    } as any;
  const logSchemaDefinition: ISchemaDefinition = {
    document: {
      type: config.dataSchema,
    },
    triggerBy: {
      type: SCHEMA_TYPE.USER,
      nullable: true,
    },
    operation: {
      type: BASIC_TYPE.TEXT,
    },
    changeData: {
      type: BASIC_TYPE.UNKNOWN,
    },
  };
  return {
    [config.logSchema]: {
      folder: config.dataGenConfig.folder,
      schema: logSchemaDefinition,
    },
    [config.dataSchema]: {
      ...config.dataGenConfig,
      schema: {
        ...config.dataGenConfig.schema,
        [LAST_MODIFIED_BY]: {
          type: SCHEMA_TYPE.USER,
          nullable: true,
        },
      },
      logSchema: config.logSchema,
    },
  } as any;
}

export const LAST_MODIFIED_BY = "lastModifiedBy"