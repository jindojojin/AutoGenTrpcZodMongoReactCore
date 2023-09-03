import { z } from "zod";
import {zAssetInput, zAssetOutput} from './zAsset';
import {zAssetCategoryLogInput, zAssetCategoryLogOutput} from './zAssetCategoryLog';
import {zAssetCategoryInput, zAssetCategoryOutput} from './zAssetCategory';
import {zAssetPropertyLogInput, zAssetPropertyLogOutput} from './zAssetPropertyLog';
import {zAssetPropertyInput, zAssetPropertyOutput} from './zAssetProperty';
import {zAssetPicLogInput, zAssetPicLogOutput} from './zAssetPicLog';
import {zAssetPicInput, zAssetPicOutput} from './zAssetPic';
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
export const zAssetLogOutput = z.object({_id:zObjectId(),document:zAssetOutput.passthrough().or(zObjectId()).optional(),triggerBy:zUserOutput.or(zObjectId()).optional().nullable(),operation:z.string().optional(),changeData:z.any().optional()});
export const zAssetLogQuery = z.object({document:ZodMongoQuery.z$query(zObjectId()),triggerBy:ZodMongoQuery.z$query(zObjectId()),operation:ZodMongoQuery.z$query(z.string()),changeData:ZodMongoQuery.z$query(z.any())}).passthrough().partial();
export const zAssetLogInput = z.object({document:zObjectId().optional(),triggerBy:zObjectId().optional().nullable(),operation:z.string().optional(),changeData:z.any().optional()});
export const ZodAssetLogAPIs = getBasicRouteZodIO({
  input: zAssetLogInput,
  output: zAssetLogOutput,
  query: zAssetLogQuery,
},zAssetLogOutput.keyof());