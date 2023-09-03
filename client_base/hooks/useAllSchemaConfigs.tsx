import { useEffect, useMemo, useState } from "react";
import { API_NAME } from "../../share/constants/database_apis";
import { DYNAMIC_CATEGORY_ID } from "../../share/constants/database_fields";
import { ISchemaConfig } from "../../share/types/ISchemaConfig";
import { getSchemaConfigFromFieldConfigs } from "../../share/SchemaUtils";
import { databaseClient } from "../../../src/trpc/service";

function useAllSchemaConfigs(
  categoryRoute: API_NAME,
  propertyRoute: API_NAME,
  categoryField: string = DYNAMIC_CATEGORY_ID
): Map<string, ISchemaConfig<any>> {
  const [CategoryInfos, setCategoryInfos] = useState<any[] | undefined>();
  const [PropertyInfos, setPropertyInfos] = useState<any[] | undefined>();

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const categories = await databaseClient[categoryRoute].findMany.mutate({});
      const properties = await databaseClient[propertyRoute].findMany.mutate({});
      setCategoryInfos(categories.records);
      setPropertyInfos(properties.records);
    })();
  }, []);
  const SchemaConfigs = useMemo(() => {
    const Result = new Map<string, ISchemaConfig<any>>();
    if (CategoryInfos && PropertyInfos) {
      CategoryInfos.forEach((categoryInfo: any) => {
        console.log("Build schemaconfig for ", categoryInfo);
        const Fields = PropertyInfos.filter(
          (field: any) => field[categoryField] == categoryInfo._id
        );
        console.log("With fields:", Fields);
        Result.set(
          categoryInfo._id,
          getSchemaConfigFromFieldConfigs(Fields, categoryInfo[DYNAMIC_CATEGORY_ID])
        );
      });
      console.log(Result);
    }
    return Result;
  }, [JSON.stringify(PropertyInfos), JSON.stringify(CategoryInfos)]);
  return SchemaConfigs;
}

export default useAllSchemaConfigs;