import { z } from "zod";
import {zAssetLogInput, zAssetLogOutput} from '../assets/zAssetLog';
import {zAssetInput, zAssetOutput} from '../assets/zAsset';
import {zAssetCategoryLogInput, zAssetCategoryLogOutput} from '../assets/zAssetCategoryLog';
import {zAssetCategoryInput, zAssetCategoryOutput} from '../assets/zAssetCategory';
import {zAssetPropertyLogInput, zAssetPropertyLogOutput} from '../assets/zAssetPropertyLog';
import {zAssetPropertyInput, zAssetPropertyOutput} from '../assets/zAssetProperty';
import {zAssetPicLogInput, zAssetPicLogOutput} from '../assets/zAssetPicLog';
import {zAssetPicInput, zAssetPicOutput} from '../assets/zAssetPic';
import {zAssetInvoiceLogInput, zAssetInvoiceLogOutput} from '../assets/zAssetInvoiceLog';
import {zAssetInvoiceInput, zAssetInvoiceOutput} from '../assets/zAssetInvoice';
import {zTaskInput, zTaskOutput} from '../tasks/zTask';
import {zTaskCheckItemInput, zTaskCheckItemOutput} from '../tasks/zTaskCheckItem';
import {zPlmCodeInput, zPlmCodeOutput} from '../projects/zPlmCode';
import {zPlmDefectInput, zPlmDefectOutput} from '../projects/zPlmDefect';
import {zProjectInput, zProjectOutput} from '../projects/zProject';
import {zTestProjectInput, zTestProjectOutput} from '../projects/zTestProject';
import {zTtv2TestSuiteInput, zTtv2TestSuiteOutput} from '../projects/zTtv2TestSuite';
import {zTtv2TestSetInput, zTtv2TestSetOutput} from '../projects/zTtv2TestSet';
import {zTtv2TestcaseInput, zTtv2TestcaseOutput} from '../projects/zTtv2Testcase';
import {zScopeInput, zScopeOutput} from './zScope';
import {zUserInput, zUserOutput} from './zUser';
import {
 ZodMongoQuery,
 zObjectId,
} from "../../zodUtils";
import {zUpsertOutput} from "../../database-functions/upsertMany";
import {zImportOutput} from "../../database-functions/importMany";
import {getBasicRouteZodIO} from "../../trpc-dynamic-routes/utils/ZodBuilders";
export const zUserScopeOutput = z.object({_id:zObjectId(),top:zObjectId().optional().nullable(),name:z.string(),members:z.array(zUserOutput.or(zObjectId())).optional(),scopes:z.array(zScopeOutput.or(zObjectId())).optional()});
export const zUserScopeQuery = z.object({top:ZodMongoQuery.z$query(zObjectId()),name:ZodMongoQuery.z$query(z.string()),members:ZodMongoQuery.z$arrayQuery(ZodMongoQuery.z$query(zObjectId())),scopes:ZodMongoQuery.z$arrayQuery(ZodMongoQuery.z$query(zObjectId()))}).passthrough().partial();
export const zUserScopeInput = z.object({top:zObjectId().optional().nullable(),name:z.string(),members:z.array(zObjectId()).optional(),scopes:z.array(zObjectId()).optional()});
export const ZodUserScopeAPIs = getBasicRouteZodIO({
  input: zUserScopeInput,
  output: zUserScopeOutput,
  query: zUserScopeQuery,
},zUserScopeOutput.keyof());