import path from "path";
import CONFIG from '../config.json';
import {GenList} from "../schemas";
import {getObjectKeys} from "../share/CommonFunctions";
import {ViewGenList} from "../views";
import {copyFile, copyFiles} from "./genUtils";
import {genBaseRouter, genBaseRouterForView, genBaseRouterTableAPI} from "./generators/autoGenBaseRouter";
import {autoGenBaseRouterIndex, autoGenBaseRouterIndexForView} from "./generators/autoGenBaseRouterIndex";
import {autoGenDatabaseAPI} from "./generators/autoGenDatabaseAPI";
import {autoGenDatabaseAutoLog} from "./generators/autoGenDatabaseAutoLog";
import {autoGenDatabaseModel, autoGenDatabaseModelForView} from "./generators/autoGenDatabaseModel";
import {autoGenMongooseSchema, autoGenMongooseSchemaForView} from "./generators/autoGenMongooseSchema";
import {genSchemaConfig, genSchemaConfigForTableAPI, genSchemaConfigForView} from "./generators/autoGenSchemaConfig";
import {autoGenSchemaConfigIndex} from "./generators/autoGenSchemaConfigIndex";
import {autoGenSchemaType} from "./generators/autoGenType";
import {genZodFile, genZodFileForTableAPI, genZodFileForView} from "./generators/autoGenZod";
import {autoGenZodIndex, autoGenZodIndexForView} from "./generators/autoGenZodIndex";
import {TableAPIGen} from "../custom_apis/index.js";

const clientPath = (str: string = "") => path.resolve(CONFIG.client_path, str)
const serverPath = (str: string = "") => path.resolve(CONFIG.database_service_path, str)


copyFiles(path.resolve('client_base'), clientPath("client_base"))
copyFiles(path.resolve('server_base'), serverPath("server_base"))
copyFiles(path.resolve('share'), clientPath("share"))
copyFiles(path.resolve('share'), serverPath("share"))
copyFiles(path.resolve('schemas'), serverPath("schemas"))//
copyFiles(path.resolve('views'), serverPath("views"))//
copyFiles(path.resolve('custom_apis'), serverPath("custom_apis"))//
copyFile(path.resolve('schemas/SchemaTypes.ts'), clientPath("schemas"))//
copyFile(path.resolve('views/ViewTypes.ts'), clientPath("views"))//
copyFile(path.resolve('custom_apis/TableAPI.ts'), clientPath("custom_apis"))//

autoGenSchemaType([serverPath("share/types"), clientPath("share/types")], serverPath("server_base"), GenList, ViewGenList, TableAPIGen);//

//Schemas
autoGenSchemaConfigIndex([serverPath("share"), clientPath("share")], GenList, ViewGenList, TableAPIGen);//
autoGenDatabaseModel(serverPath("server_base"), GenList);//
autoGenMongooseSchema(serverPath("server_base"), GenList);//
autoGenZodIndex(serverPath("server_base"), GenList);//
autoGenBaseRouterIndex(serverPath("server_base"), GenList);//
autoGenDatabaseAPI([serverPath("share"), clientPath("share")], GenList, ViewGenList, TableAPIGen);


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
// autoGenSchemaConfigIndexForView([serverPath("share"), clientPath("share")], ViewGenList);//
autoGenDatabaseModelForView(serverPath("server_base"), ViewGenList);//
autoGenMongooseSchemaForView(serverPath("server_base"), ViewGenList);
autoGenZodIndexForView(serverPath("server_base"), ViewGenList, TableAPIGen);//
autoGenBaseRouterIndexForView(serverPath("server_base"), ViewGenList);//


getObjectKeys(ViewGenList).forEach((view_type) => {
    genZodFileForView(serverPath("server_base"), view_type, ViewGenList[view_type]);
    genBaseRouterForView(serverPath("server_base"), view_type, ViewGenList[view_type]);
    genSchemaConfigForView([serverPath("share"), clientPath("share")], view_type, ViewGenList[view_type]);
})

//TableAPI
getObjectKeys(TableAPIGen).forEach(table => {
    genBaseRouterTableAPI(serverPath("server_base"), table, TableAPIGen[table]);
    genZodFileForTableAPI(serverPath("server_base"), table, TableAPIGen[table]);
    genSchemaConfigForTableAPI([serverPath("share"), clientPath("share")], table, TableAPIGen[table])
})
