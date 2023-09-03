import {copyFile, copyFiles} from "./utils/genUtils";
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
import {getObjectKeys} from "./utils/CommonFunctions";

const clientPath = (str: string = "") => path.resolve(CONFIG.client_path, str)
const serverPath = (str: string = "") => path.resolve(CONFIG.database_service_path, str)


copyFiles(path.resolve('client_base'), clientPath("client_base"))
copyFiles(path.resolve('types'), clientPath("types"))
copyFile(path.resolve('utils/SchemaUtils.ts'), clientPath("utils"))
copyFile(path.resolve('utils/ScopeUtils.ts'), clientPath("utils"))
copyFile(path.resolve('utils/CommonFunctions.ts'), clientPath("utils"))

copyFiles(path.resolve('constants'), clientPath("constants"))
copyFiles(path.resolve('types'), serverPath("types"))
copyFiles(path.resolve('utils'), serverPath("utils"))
copyFiles(path.resolve('schemas'), serverPath("schemas"))
copyFiles(path.resolve('constants'), serverPath("constants"))
copyFile(path.resolve('GenList.ts'), serverPath())

autoGenSchemaType([serverPath("types"), clientPath("types")], serverPath(), GenList);
autoGenDatabaseModel(serverPath(), GenList);
autoGenMongooseSchema(serverPath(), GenList);
autoGenSchemaConfigIndex([serverPath(),clientPath()], GenList);
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
    genSchemaConfig([serverPath(), clientPath()], schema_type, GenList[schema_type]);
});
