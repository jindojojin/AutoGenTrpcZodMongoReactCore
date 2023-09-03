import { ISchemaDefinition } from "../../share/types/ISchemaDefinition";
import { BASIC_TYPE, SCHEMA_TYPE } from "../../share/types/DataTypes";

import {GenConfig} from "../genUtils";

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
      logSchema: config.logSchema,
    },
  } as any;
}
