import path from "path";
import CONFIG from '../config.json';
import { GenList } from "../schemas";
import { getObjectKeys } from "../share/CommonFunctions";
import { ViewGenList } from "../views";
import { copyFile, copyFiles } from "./genUtils";
import { genBaseRouter, genBaseRouterForView } from "./generators/autoGenBaseRouter";
import { autoGenBaseRouterIndex, autoGenBaseRouterIndexForView } from "./generators/autoGenBaseRouterIndex";
import { autoGenDatabaseAPI } from "./generators/autoGenDatabaseAPI";
import { autoGenDatabaseAutoLog } from "./generators/autoGenDatabaseAutoLog";
import { autoGenDatabaseModel, autoGenDatabaseModelForView } from "./generators/autoGenDatabaseModel";
import { autoGenMongooseSchema, autoGenMongooseSchemaForView } from "./generators/autoGenMongooseSchema";
import { genSchemaConfig, genSchemaConfigForView } from "./generators/autoGenSchemaConfig";
import { autoGenSchemaConfigIndex, autoGenSchemaConfigIndexForView } from "./generators/autoGenSchemaConfigIndex";
import { autoGenSchemaType } from "./generators/autoGenType";
import { genZodFile, genZodFileForView } from "./generators/autoGenZod";
import { autoGenZodIndex, autoGenZodIndexForView } from "./generators/autoGenZodIndex";

const clientPath = (str: string = "") => path.resolve(CONFIG.client_path, str)
const serverPath = (str: string = "") => path.resolve(CONFIG.database_service_path, str)


copyFiles(path.resolve('client_base'), clientPath("client_base"))
copyFiles(path.resolve('server_base'), serverPath("server_base"))
copyFiles(path.resolve('share'), clientPath("share"))
copyFiles(path.resolve('share'), serverPath("share"))
copyFiles(path.resolve('schemas'), serverPath("schemas"))//
copyFiles(path.resolve('views'), serverPath("views"))//
copyFile(path.resolve('schemas/SchemaTypes.ts'), clientPath("schemas"))//
copyFile(path.resolve('views/ViewTypes.ts'), clientPath("views"))//

autoGenSchemaType([serverPath("share/types"), clientPath("share/types")], serverPath("server_base"), GenList, ViewGenList);//

//Schemas
autoGenSchemaConfigIndex([serverPath("share"), clientPath("share")], GenList);//
autoGenDatabaseModel(serverPath("server_base"), GenList);//
autoGenMongooseSchema(serverPath("server_base"), GenList);//
autoGenZodIndex(serverPath("server_base"), GenList);//
autoGenBaseRouterIndex(serverPath("server_base"), GenList);
autoGenDatabaseAPI([serverPath("share"), clientPath("share")], GenList);


autoGenDatabaseAutoLog(serverPath("server_base"), GenList);
getObjectKeys(GenList).forEach((schema_type) => {
    //gen zod from schema
    genZodFile(serverPath("server_base"), schema_type, GenList[schema_type]);
    //gen base router
    genBaseRouter(serverPath("server_base"), schema_type, GenList[schema_type]);
    // gen table cofig
    genSchemaConfig([serverPath("share"), clientPath("share")], schema_type, GenList[schema_type]);
});

//Views
autoGenSchemaConfigIndexForView([serverPath("share"), clientPath("share")], ViewGenList);//
autoGenDatabaseModelForView(serverPath("server_base"), ViewGenList);//
autoGenMongooseSchemaForView(serverPath("server_base"), ViewGenList);
autoGenZodIndexForView(serverPath("server_base"), ViewGenList);//
autoGenBaseRouterIndexForView(serverPath("server_base"), ViewGenList);


getObjectKeys(ViewGenList).forEach((view_type) => {
    //gen zod from schema
    genZodFileForView(serverPath("server_base"), view_type, ViewGenList[view_type]);
    //gen base router
    genBaseRouterForView(serverPath("server_base"), view_type, ViewGenList[view_type]);
    // gen table cofig
    genSchemaConfigForView([serverPath("share"), clientPath("share")], view_type, ViewGenList[view_type]);
})