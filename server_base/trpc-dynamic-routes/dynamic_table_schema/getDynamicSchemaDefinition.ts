import {SCHEMA_TYPE} from "../../../schemas/SchemaTypes";
import {DYNAMIC_CATEGORY_ID} from "../../../share/constants/database_fields";
import {BASIC_TYPE, isSchemaType} from "../../../share/types/DataTypes";
import {ISchemaDefinition} from "../../../share/types/ISchemaDefinition";
import {withAutoLog} from "../../auto-logs/AutoLogSchema";
import {PropertySchema} from "./PropertySchema";

import {GenConfig} from "../../../schemas";

type Config<T> = Partial<GenConfig> & {
  name: T;
};

function getSchemaConfig<T extends SCHEMA_TYPE>(config: Config<T> | T): {
  type: T;
  definition: ISchemaDefinition;
  genConfig:Partial<GenConfig>
} {
  return {
    type: (config as Config<T>).name ?? (config as T),
    definition: (config as Config<T>).schema ?? {},
    genConfig:  isSchemaType(config)?{} :config as any
  };
}

export function getDynamicSchemaGenConfigs<
  D extends SCHEMA_TYPE,
  DL extends SCHEMA_TYPE,
  P extends SCHEMA_TYPE,
  PL extends SCHEMA_TYPE,
  C extends SCHEMA_TYPE,
  CL extends SCHEMA_TYPE,
>(
  config: {
    data: D | Config<D>;
    dataLog?: DL;
    property: P | Config<P>;
    propertyLog?: PL;
    category: C | Config<C>;
    categoryLog?: CL;
  },
  folder?: string,
): Record<D | P | C | DL | PL | CL, GenConfig> {
  const dataSchema = getSchemaConfig(config.data);
  const cateSchema = getSchemaConfig(config.category);
  const propSchema = getSchemaConfig(config.property);
  return {
    ...withAutoLog({
      logSchema: config.dataLog,
      dataSchema: dataSchema.type,
      dataGenConfig: {
        ...dataSchema.genConfig,
        schema: {
          [DYNAMIC_CATEGORY_ID]: {
            type: cateSchema.type,
            importKey:true,
            exportKey:true,
            hidden: true,
          },
          ...dataSchema.definition,
        },
        dynamic: {
          category: cateSchema.type,
          property: propSchema.type,
        },
        folder,
      },
    }),
    ...withAutoLog({
      logSchema: config.categoryLog,
      dataSchema: cateSchema.type,
      dataGenConfig: {
        ...cateSchema.genConfig,
        folder,
        schema: {
          [DYNAMIC_CATEGORY_ID]: {
            type: BASIC_TYPE.TEXT,
            unique: true,
            required: true,
            exportKey: true,
            importKey: true,
            searchKey: true,
          },
          ...cateSchema.definition,
        },
      },
    }),
    ...withAutoLog({
      logSchema: config.propertyLog,
      dataSchema: propSchema.type,
      dataGenConfig: {
        ...propSchema.genConfig,
        folder,
        schema: {
          [DYNAMIC_CATEGORY_ID]: {
            type: cateSchema.type,
            hidden: true,
          },
          ...PropertySchema,
        },
      },
    }),
  } as any;
}