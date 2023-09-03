import { ISchemaConfig } from "../../types/ISchemaConfig";
import { getObjectKeys } from "../Common/Utils";
import IFormConfig, { IFormItemConfig } from "./IFormConfig";
import { FieldPath, FieldValues } from "react-hook-form";
import React from "react";
import _ from "lodash";
import { getDefaultFormInput } from "./getDefaultFormInput";
import { capitalCase } from "change-case";

export function createFormConfigFromSchemaConfig<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
>(
  schemaConfig: ISchemaConfig<T>,
  custom?: IFormConfig<T, TName>,
  excludeKeys?: TName[]
): IFormConfig<T> {
  const keys = getObjectKeys(schemaConfig.fieldConfigs).filter(
    (key) =>
      !excludeKeys?.includes(key as TName) &&
      key != "_id" &&
      !schemaConfig.fieldConfigs[key].hidden
  );
  return {
    label: schemaConfig.name,
    ..._.omit(custom, "items"),
    formItems: keys.map((k) => {
      const customItem = custom?.formItems.find((item) => item.key == k);
      const result: IFormItemConfig<T> = {
        ...schemaConfig.fieldConfigs[k],
        label: schemaConfig.fieldConfigs[k].label ?? capitalCase(String(k)),
        key: k as any,
        ...(customItem ?? {}),
        render: customItem?.render
          ? (customItem.render as any)
          : (config) =>
              getDefaultFormInput(schemaConfig.fieldConfigs[k], config),
      };
      return result;
    }),
  };
}