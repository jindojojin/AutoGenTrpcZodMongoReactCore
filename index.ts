import {copyFile, copyFiles} from "./server_base/genUtils";
import CONFIG from './config.json'
import path from "path";
import {autoGenSchemaType} from "./src/generators/autoGenType";
import {GenList} from "./GenList";
import {autoGenDatabaseModel} from "./src/generators/autoGenDatabaseModel";
import {autoGenMongooseSchema} from "./src/generators/autoGenMongooseSchema";
import {autoGenSchemaConfigIndex} from "./src/generators/autoGenSchemaConfigIndex";
import {autoGenZodIndex} from "./src/generators/autoGenZodIndex";
import {genZodFile} from "./src/generators/autoGenZod";
import {genBaseRouter} from "./src/generators/autoGenBaseRouter";
import {genSchemaConfig} from "./src/generators/autoGenSchemaConfig";
import {autoGenDatabaseAPI} from "./src/generators/autoGenDatabaseAPI";
import {autoGenBaseRouterIndex} from "./src/generators/autoGenBaseRouterIndex";
import {autoGenDatabaseAutoLog} from "./src/generators/autoGenDatabaseAutoLog";
import {getObjectKeys} from "./share/CommonFunctions";

const clientPath = (str: string = "") => path.resolve(CONFIG.client_path, str)
const serverPath = (str: string = "") => path.resolve(CONFIG.database_service_path, str)


copyFiles(path.resolve('client_base'), clientPath("client_base"))
copyFiles(path.resolve('server_base'), serverPath("server_base"))
copyFiles(path.resolve('share'), clientPath("share"))
copyFiles(path.resolve('share'), serverPath("share"))
copyFile(path.resolve('GenList.ts'), serverPath())

autoGenSchemaType([serverPath("share/types"), clientPath("share/types")], serverPath(), GenList);
autoGenSchemaConfigIndex([serverPath("share"), clientPath("share")], GenList);
autoGenDatabaseModel(serverPath(), GenList);
autoGenMongooseSchema(serverPath(), GenList);
autoGenZodIndex(serverPath(), GenList);
autoGenBaseRouterIndex(serverPath(), GenList);
autoGenDatabaseAPI(serverPath(), GenList);
autoGenDatabaseAutoLog(serverPath(), GenList);
getObjectKeys(GenList).map((schema_type) => {
    //gen zod from schema
    genZodFile(serverPath(), schema_type, GenList[schema_type]);
    //gen base router
    genBaseRouter(serverPath(), schema_type, GenList[schema_type]);
    // gen table cofig
    genSchemaConfig([serverPath("share"), clientPath("share")], schema_type, GenList[schema_type]);
});
