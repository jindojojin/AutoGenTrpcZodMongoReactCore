import { FORM_ACTION, FormConfigProps } from "../configs/FormConfigs";
import { SCHEMA_TYPE } from "../../../schemas/SchemaTypes";
import { DATABASE_ACTIONS } from "../../../share/constants/authentication";
import { useContext } from "react";
import { AuthContext } from "../../../../src/routes/authen/Auth";
import { LIST_ACTION, ListConfigProps } from "../configs/ListConfigs";

export function useFormUsagesByUserScopes(
    schema: SCHEMA_TYPE,
): FormConfigProps<any>["usages"] {
    const { userHasScope } = useContext(AuthContext);
    return {
        [FORM_ACTION.UPDATE]: userHasScope([schema, DATABASE_ACTIONS.UPDATE]),
        [FORM_ACTION.DELETE]: userHasScope([schema, DATABASE_ACTIONS.DELETE]),
        [FORM_ACTION.CREATE]: userHasScope([schema, DATABASE_ACTIONS.CREATE]),
    };
}

export function useListUsagesByUserScopes(
    schema: SCHEMA_TYPE,
): ListConfigProps<any>["usages"] {
    const { userHasScope } = useContext(AuthContext);
    return {
        [LIST_ACTION.IMPORT_FROM_EXCEL]: userHasScope([
            {
                table: schema,
                actions: [DATABASE_ACTIONS.CREATE, DATABASE_ACTIONS.UPDATE],
            },
        ]),
        [LIST_ACTION.IMPORT_FROM_TEXT]: userHasScope([
            {
                table: schema,
                actions: [DATABASE_ACTIONS.CREATE, DATABASE_ACTIONS.UPDATE],
            },
        ]),
        [LIST_ACTION.EXPORT_EXCEL_TEMPLATE]: userHasScope([
            {
                table: schema,
                actions: [DATABASE_ACTIONS.CREATE, DATABASE_ACTIONS.UPDATE],
            },
        ]),
        [LIST_ACTION.EXPORT_EXCEL_DATA]: userHasScope([
            {
                table: schema,
                actions: [DATABASE_ACTIONS.READ],
            },
        ]),
    };
}