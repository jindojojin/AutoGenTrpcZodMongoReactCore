import {copyFile, copyFiles, getObjectKeys} from "./utils/genUtils";
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


copyFiles(path.resolve('types'), path.resolve(CONFIG.database_service_path, "types"))
copyFiles(path.resolve('types'), path.resolve(CONFIG.client_path, "types"))
copyFiles(path.resolve('utils'), path.resolve(CONFIG.database_service_path, "utils"))
copyFiles(path.resolve('schemas'), path.resolve(CONFIG.database_service_path, "schemas"))
copyFiles(path.resolve('constants'), path.resolve(CONFIG.database_service_path, "constants"))
copyFiles(path.resolve('constants'), path.resolve(CONFIG.client_path, "constants"))
copyFile(path.resolve('GenList.ts'), path.resolve(CONFIG.database_service_path))

autoGenSchemaType([path.resolve(CONFIG.database_service_path, "types"), path.resolve(CONFIG.client_path, "types")], path.resolve(CONFIG.database_service_path), GenList);
autoGenDatabaseModel(path.resolve(CONFIG.database_service_path), GenList);
autoGenMongooseSchema(path.resolve(CONFIG.database_service_path), GenList);
autoGenSchemaConfigIndex(path.resolve(CONFIG.database_service_path), GenList);
autoGenZodIndex(path.resolve(CONFIG.database_service_path), GenList);
autoGenBaseRouterIndex(path.resolve(CONFIG.database_service_path), GenList);
autoGenDatabaseAPI(path.resolve(CONFIG.database_service_path), GenList);
autoGenDatabaseAutoLog(path.resolve(CONFIG.database_service_path), GenList);
getObjectKeys(GenList).map((schema_type) => {
    //gen zod from schema
    genZodFile(path.resolve(CONFIG.database_service_path), schema_type, GenList[schema_type]);
    //gen base router
    genBaseRouter(path.resolve(CONFIG.database_service_path), schema_type, GenList[schema_type]);
    // gen table cofig
    genSchemaConfig([path.resolve(CONFIG.database_service_path), path.resolve(CONFIG.client_path)], schema_type, GenList[schema_type]);
});
