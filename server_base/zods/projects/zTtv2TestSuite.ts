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
import {zPlmCodeInput, zPlmCodeOutput} from './zPlmCode';
import {zPlmDefectInput, zPlmDefectOutput} from './zPlmDefect';
import {zProjectInput, zProjectOutput} from './zProject';
import {zTestProjectInput, zTestProjectOutput} from './zTestProject';
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
export const zTtv2TestSuiteOutput = z.object({_id:zObjectId(),testProject:zTestProjectOutput.or(zObjectId()).optional(),id:z.number(),name:z.string().optional(),iplan_start:z.date().optional().nullable(),iplan_end:z.date().optional().nullable(),mplan_start:z.date().optional().nullable(),mplan_end:z.date().optional().nullable(),iplan_ga:z.date().optional().nullable(),mplan_ga:z.date().optional().nullable(),lastSync:z.date().optional()});
export const zTtv2TestSuiteQuery = z.object({testProject:ZodMongoQuery.z$query(zObjectId()),id:ZodMongoQuery.z$query(z.number()),name:ZodMongoQuery.z$query(z.string()),iplan_start:ZodMongoQuery.z$query(z.date()),iplan_end:ZodMongoQuery.z$query(z.date()),mplan_start:ZodMongoQuery.z$query(z.date()),mplan_end:ZodMongoQuery.z$query(z.date()),iplan_ga:ZodMongoQuery.z$query(z.date()),mplan_ga:ZodMongoQuery.z$query(z.date()),lastSync:ZodMongoQuery.z$query(z.date())}).passthrough().partial();
export const zTtv2TestSuiteInput = z.object({testProject:zObjectId().optional(),id:z.number(),name:z.string().optional(),iplan_start:z.date().optional().nullable(),iplan_end:z.date().optional().nullable(),mplan_start:z.date().optional().nullable(),mplan_end:z.date().optional().nullable(),iplan_ga:z.date().optional().nullable(),mplan_ga:z.date().optional().nullable(),lastSync:z.date().optional()});
export const ZodTtv2TestSuiteAPIs = getBasicRouteZodIO({
  input: zTtv2TestSuiteInput,
  output: zTtv2TestSuiteOutput,
  query: zTtv2TestSuiteQuery,
},zTtv2TestSuiteOutput.keyof());