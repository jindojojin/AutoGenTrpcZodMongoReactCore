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
import {zPlmDefectInput, zPlmDefectOutput} from './zPlmDefect';
import {zProjectInput, zProjectOutput} from './zProject';
import {zTestProjectInput, zTestProjectOutput} from './zTestProject';
import {zTtv2TestSuiteInput, zTtv2TestSuiteOutput} from './zTtv2TestSuite';
import {zTtv2TestSetInput, zTtv2TestSetOutput} from './zTtv2TestSet';
import {zTtv2TestcaseInput, zTtv2TestcaseOutput} from './zTtv2Testcase';
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
export const zPlmCodeOutput = z.object({_id:zObjectId(),testProject:zTestProjectOutput.or(zObjectId()).optional(),plmCode:z.string(),note:z.string().optional(),lastSync:z.date().optional()});
export const zPlmCodeQuery = z.object({testProject:ZodMongoQuery.z$query(zObjectId()),plmCode:ZodMongoQuery.z$query(z.string()),note:ZodMongoQuery.z$query(z.string()),lastSync:ZodMongoQuery.z$query(z.date())}).passthrough().partial();
export const zPlmCodeInput = z.object({testProject:zObjectId().optional(),plmCode:z.string(),note:z.string().optional(),lastSync:z.date().optional()});
export const ZodPlmCodeAPIs = getBasicRouteZodIO({
  input: zPlmCodeInput,
  output: zPlmCodeOutput,
  query: zPlmCodeQuery,
},zPlmCodeOutput.keyof());