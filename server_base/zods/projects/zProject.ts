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
export const zProjectOutput = z.object({_id:zObjectId(),logo:zObjectId().optional(),name:z.string(),alias_1:z.string().optional(),alias_2:z.string().optional(),alias_3:z.string().optional()});
export const zProjectQuery = z.object({logo:ZodMongoQuery.z$query(zObjectId()),name:ZodMongoQuery.z$query(z.string()),alias_1:ZodMongoQuery.z$query(z.string()),alias_2:ZodMongoQuery.z$query(z.string()),alias_3:ZodMongoQuery.z$query(z.string())}).passthrough().partial();
export const zProjectInput = z.object({logo:zObjectId().optional(),name:z.string(),alias_1:z.string().optional(),alias_2:z.string().optional(),alias_3:z.string().optional()});
export const ZodProjectAPIs = getBasicRouteZodIO({
  input: zProjectInput,
  output: zProjectOutput,
  query: zProjectQuery,
},zProjectOutput.keyof());