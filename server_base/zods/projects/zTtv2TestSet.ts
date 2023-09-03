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
import {zTtv2TestSuiteInput, zTtv2TestSuiteOutput} from './zTtv2TestSuite';
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
export const zTtv2TestSetOutput = z.object({_id:zObjectId(),tpid:zTtv2TestSuiteOutput.or(zObjectId()).optional(),id:z.number(),category:z.string().optional(),title:z.string().optional(),state:z.number().optional(),syncFlag:z.boolean().optional()});
export const zTtv2TestSetQuery = z.object({tpid:ZodMongoQuery.z$query(zObjectId()),id:ZodMongoQuery.z$query(z.number()),category:ZodMongoQuery.z$query(z.string()),title:ZodMongoQuery.z$query(z.string()),state:ZodMongoQuery.z$query(z.number()),syncFlag:ZodMongoQuery.z$query(z.boolean())}).passthrough().partial();
export const zTtv2TestSetInput = z.object({tpid:zObjectId().optional(),id:z.number(),category:z.string().optional(),title:z.string().optional(),state:z.number().optional(),syncFlag:z.boolean().optional()});
export const ZodTtv2TestSetAPIs = getBasicRouteZodIO({
  input: zTtv2TestSetInput,
  output: zTtv2TestSetOutput,
  query: zTtv2TestSetQuery,
},zTtv2TestSetOutput.keyof());