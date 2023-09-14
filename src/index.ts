import {copyFile, copyFiles} from "./genUtils";
import CONFIG from '../config.json'
import path from "path";
import {autoGenSchemaType} from "./generators/autoGenType";
import {autoGenDatabaseModel} from "./generators/autoGenDatabaseModel";
import {autoGenMongooseSchema} from "./generators/autoGenMongooseSchema";
import {autoGenSchemaConfigIndex} from "./generators/autoGenSchemaConfigIndex";
import {autoGenZodIndex} from "./generators/autoGenZodIndex";
import {genZodFile} from "./generators/autoGenZod";
import {genBaseRouter} from "./generators/autoGenBaseRouter";
import {genSchemaConfig} from "./generators/autoGenSchemaConfig";
import {autoGenDatabaseAPI} from "./generators/autoGenDatabaseAPI";
import {autoGenBaseRouterIndex} from "./generators/autoGenBaseRouterIndex";
import {autoGenDatabaseAutoLog} from "./generators/autoGenDatabaseAutoLog";
import {getObjectKeys} from "../share/CommonFunctions";
import {GenList} from "../schemas";

const clientPath = (str: string = "") => path.resolve(CONFIG.client_path, str)
const serverPath = (str: string = "") => path.resolve(CONFIG.database_service_path, str)


copyFiles(path.resolve('client_base'), clientPath("client_base"))
copyFiles(path.resolve('server_base'), serverPath("server_base"))
copyFiles(path.resolve('share'), clientPath("share"))
copyFiles(path.resolve('share'), serverPath("share"))
copyFiles(path.resolve('schemas'), serverPath("schemas"))
copyFile(path.resolve('schemas/SchemaTypes.ts'), clientPath("schemas"))

autoGenSchemaType([serverPath("share/types"), clientPath("share/types")], serverPath("server_base"), GenList);
autoGenSchemaConfigIndex([serverPath("share"), clientPath("share")], GenList);
autoGenDatabaseModel(serverPath("server_base"), GenList);
autoGenMongooseSchema(serverPath("server_base"), GenList);
autoGenZodIndex(serverPath("server_base"), GenList);
autoGenBaseRouterIndex(serverPath("server_base"), GenList);
autoGenDatabaseAPI([serverPath("share"),clientPath("share")], GenList);
autoGenDatabaseAutoLog(serverPath("server_base"), GenList);
getObjectKeys(GenList).map((schema_type) => {
    //gen zod from schema
    genZodFile(serverPath("server_base"), schema_type, GenList[schema_type]);
    //gen base router
    genBaseRouter(serverPath("server_base"), schema_type, GenList[schema_type]);
    // gen table cofig
    genSchemaConfig([serverPath("share"), clientPath("share")], schema_type, GenList[schema_type]);
});