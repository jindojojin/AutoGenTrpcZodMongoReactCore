import { z } from "zod";
import {zAssetLogInput, zAssetLogOutput} from './zAssetLog';
import {zAssetInput, zAssetOutput} from './zAsset';
import {zAssetCategoryLogInput, zAssetCategoryLogOutput} from './zAssetCategoryLog';
import {zAssetCategoryInput, zAssetCategoryOutput} from './zAssetCategory';
import {zAssetPropertyLogInput, zAssetPropertyLogOutput} from './zAssetPropertyLog';
import {zAssetPropertyInput, zAssetPropertyOutput} from './zAssetProperty';
import {zAssetPicLogInput, zAssetPicLogOutput} from './zAssetPicLog';
import {zAssetInvoiceLogInput, zAssetInvoiceLogOutput} from './zAssetInvoiceLog';
import {zAssetInvoiceInput, zAssetInvoiceOutput} from './zAssetInvoice';
import {zTaskInput, zTaskOutput} from '../tasks/zTask';
import {zTaskCheckItemInput, zTaskCheckItemOutput} from '../tasks/zTaskCheckItem';
import {zPlmCodeInput, zPlmCodeOutput} from '../projects/zPlmCode';
import {zPlmDefectInput, zPlmDefectOutput} from '../projects/zPlmDefect';
import {zProjectInput, zProjectOutput} from '../projects/zProject';
import {zTestProjectInput, zTestProjectOutput} from '../projects/zTestProject';
import {zTtv2TestSuiteInput, zTtv2TestSuiteOutput} from '../projects/zTtv2TestSuite';
import {zTtv2TestSetInput, zTtv2TestSetOutput} from '../projects/zTtv2TestSet';
import {zTtv2TestcaseInput, zTtv2TestcaseOutput} from '../projects/zTtv2Testcase';
import {zScopeInput, zScopeOutput} from '../users/zScope';
import {zUserInput, zUserOutput} from '../users/zUser';
import {zUserScopeInput, zUserScopeOutput} from '../users/zUserScope';
import {
 ZodMongoQuery,
 zObjectId,
} from "../../zodUtils";
import {zUpsertOutput} from "../../database-functions/upsertMany";
import {zImportOutput} from "../../database-functions/importMany";
import {getBasicRouteZodIO} from "../../trpc-dynamic-routes/utils/ZodBuilders";
export const zAssetPicOutput = z.object({_id:zObjectId(),asset:zAssetOutput.passthrough().or(zObjectId()),pic:zUserOutput.or(zObjectId()),status:z.enum(["OK","NOK"]).optional(),quantity:z.number().default(1),projects:z.array(zProjectOutput.or(zObjectId())).optional()});
export const zAssetPicQuery = z.object({asset:ZodMongoQuery.z$query(zObjectId()),pic:ZodMongoQuery.z$query(zObjectId()),status:ZodMongoQuery.z$query(z.enum(["OK","NOK"])),quantity:ZodMongoQuery.z$query(z.number()),projects:ZodMongoQuery.z$arrayQuery(ZodMongoQuery.z$query(zObjectId()))}).passthrough().partial();
export const zAssetPicInput = z.object({asset:zObjectId(),pic:zObjectId(),status:z.enum(["OK","NOK"]).optional(),quantity:z.number().default(1),projects:z.array(zObjectId()).optional()});
export const ZodAssetPicAPIs = getBasicRouteZodIO({
  input: zAssetPicInput,
  output: zAssetPicOutput,
  query: zAssetPicQuery,
},zAssetPicOutput.keyof());