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
export const zTestProjectOutput = z.object({_id:zObjectId(),project:zProjectOutput.or(zObjectId()),packageVersion:z.string(),pa:zUserOutput.or(zObjectId()),note:z.string().optional(),schedule:z.object({start:z.date(),end:z.date()}).optional()});
export const zTestProjectQuery = z.object({project:ZodMongoQuery.z$query(zObjectId()),packageVersion:ZodMongoQuery.z$query(z.string()),pa:ZodMongoQuery.z$query(zObjectId()),note:ZodMongoQuery.z$query(z.string()),schedule:ZodMongoQuery.z$query(z.object({start:z.date(),end:z.date()}))}).passthrough().partial();
export const zTestProjectInput = z.object({project:zObjectId(),packageVersion:z.string(),pa:zObjectId(),note:z.string().optional(),schedule:z.object({start:z.date(),end:z.date()}).optional()});
export const ZodTestProjectAPIs = getBasicRouteZodIO({
  input: zTestProjectInput,
  output: zTestProjectOutput,
  query: zTestProjectQuery,
},zTestProjectOutput.keyof());