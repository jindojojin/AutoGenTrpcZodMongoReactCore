import { useEffect, useMemo, useState } from "react";
import { API_NAME } from "../../share/constants/database_apis";
import { DYNAMIC_CATEGORY_ID } from "../../share/constants/database_fields";
import { getSchemaConfigFromFieldConfigs } from "../../share/SchemaUtils";
import { databaseClient } from "../../../src/trpc/service";
import { ISchemaDefinition } from "../../share/types/ISchemaDefinition";
import _ from "lodash";

function UseSchemaConfig<T>(
    categoryId: any,
    categoryRoute: API_NAME,
    propertyRoute: API_NAME,
    fixedFieldConfigs?: ISchemaDefinition,
) {
    console.log(
        "Category Id to build schema config",
        categoryId,
        fixedFieldConfigs,
    );
    // @ts-ignore
    const [CategoryInfo, setCategoryInfo] = useState();
    const [FieldConfigs, setFieldConfigs] = useState();
    const fieldConfigAPI = databaseClient[propertyRoute].findMany;
    useEffect(() => {
        // @ts-ignore
        fieldConfigAPI
        .mutate({
            where: {
                [DYNAMIC_CATEGORY_ID]: categoryId,
            },
        })
        .then((r) => setFieldConfigs(r.records));
        databaseClient[categoryRoute].findById
        .query({ id: categoryId })
        .then((r) => setCategoryInfo(r));
    }, [categoryId]);

    const SchemaConfig = useMemo(() => {
        if (FieldConfigs) {
            return getSchemaConfigFromFieldConfigs(
                { ...fixedFieldConfigs, ..._.keyBy(FieldConfigs, "_id") },
                CategoryInfo?.[DYNAMIC_CATEGORY_ID] ?? "",
            );
        } else return undefined;
    }, [JSON.stringify(FieldConfigs), JSON.stringify(CategoryInfo)]);
    return SchemaConfig;
}

export default UseSchemaConfig;