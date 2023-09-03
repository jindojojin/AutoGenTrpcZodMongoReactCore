// Table name use for create relationship in schemas and automatic generate route,....
import {SCHEMA_TYPE} from "../share/types/DataTypes";
import {GenConfig} from "../server_base/genUtils";
import {
    getDynamicSchemaGenConfigs
} from "../server_base/trpc-dynamic-routes/dynamic_table_schema/getDynamicSchemaDefinition";
import {AssetSchema} from "./assets/Asset";
import {withAutoLog} from "../server_base/auto-logs/AutoLogSchema";
import {AssetPicSchema} from "./assets/AssetPic";
import {AssetInvoiceSchema} from "./assets/AssetInvoice";
import {TaskSchema} from "./tasks/Task";
import {TaskCheckItemSchema} from "./tasks/TaskCheckItem";
import {PLMCodeSchema} from "./projects/PLMCode";
import {PLMDefectSchema} from "./projects/PLMDefect";
import {ProjectSchema} from "./projects/Project";
import {TestProjectSchema} from "./projects/TestProject";
import {TTv2TestSuiteSchema} from "./projects/TTv2TestSuite";
import {TTv2TestSetSchema} from "./projects/TTv2TestSet";
import {TTv2TestCaseSchema} from "./projects/TTv2TestCase";
import {SystemScopeSchema, SystemUserScopeSchema} from "../server_base/basic-auth/AuthSchemas";
import {UserSchema} from "./users/User";

export const GenList: Record<SCHEMA_TYPE, GenConfig> = {
    ...getDynamicSchemaGenConfigs(
        {
            data: {
                name: SCHEMA_TYPE.ASSET,
                schema: AssetSchema,
            },
            dataLog: SCHEMA_TYPE.ASSET_LOG,
            category: SCHEMA_TYPE.ASSET_CATEGORY,
            categoryLog: SCHEMA_TYPE.ASSET_CATEGORY_LOG,
            property: SCHEMA_TYPE.ASSET_PROPERTY,
            propertyLog: SCHEMA_TYPE.ASSET_PROPERTY_LOG,
        },
        "assets",
    ),
    ...withAutoLog({
        logSchema: SCHEMA_TYPE.ASSET_PIC_LOG,
        dataSchema: SCHEMA_TYPE.ASSET_PIC,
        dataGenConfig: {
            schema: AssetPicSchema,
            folder: "assets",
        },
    }),
    ...withAutoLog({
        logSchema: SCHEMA_TYPE.ASSET_INVOICE_LOG,
        dataSchema: SCHEMA_TYPE.ASSET_INVOICE,
        dataGenConfig: {
            schema: AssetInvoiceSchema,
            folder: "assets",
        },
    }),

    [SCHEMA_TYPE.TASK]: {schema: TaskSchema, folder: "tasks"},
    [SCHEMA_TYPE.TASK_CHECK_ITEM]: {
        schema: TaskCheckItemSchema,
        folder: "tasks",
    },

    [SCHEMA_TYPE.PLM_CODE]: {
        schema: PLMCodeSchema,
        folder: "projects",
    },
    [SCHEMA_TYPE.PLM_DEFECT]: {schema: PLMDefectSchema, folder: "projects"},
    [SCHEMA_TYPE.PROJECT]: {schema: ProjectSchema, folder: "projects"},
    [SCHEMA_TYPE.TEST_PROJECT]: {
        schema: TestProjectSchema,
        folder: "projects",
        excludeFunctions: ["createMany", "updateMany", "upsertMany"],
    },
    [SCHEMA_TYPE.TTV2_TEST_SUITE]: {
        schema: TTv2TestSuiteSchema,
        folder: "projects",
    },
    [SCHEMA_TYPE.TTV2_TEST_SET]: {
        schema: TTv2TestSetSchema,
        folder: "projects",
    },
    [SCHEMA_TYPE.TTV2_TESTCASE]: {
        schema: TTv2TestCaseSchema,
        folder: "projects",
    },
    [SCHEMA_TYPE.SCOPE]: {schema: SystemScopeSchema, folder: "users"},
    [SCHEMA_TYPE.USER]: {schema: UserSchema, folder: "users"},
    [SCHEMA_TYPE.USER_SCOPE]: {schema: SystemUserScopeSchema, folder: "users"},
};