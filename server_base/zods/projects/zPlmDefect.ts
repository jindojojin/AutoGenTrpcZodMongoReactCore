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
export const zPlmDefectOutput = z.object({_id:zObjectId(),plm_code:zPlmCodeOutput.or(zObjectId()).optional(),case_code:z.string(),plm_link:z.string().optional(),title:z.string(),priority:z.enum(["A","B","C"]),register_by:z.string().optional(),user_submit:zUserOutput.or(zObjectId()).optional().nullable(),testcase_id:z.string().optional(),cl_number:z.string().optional(),problem_status:z.enum(["Open","Resolve","Close","Delete"]).optional(),resolution_type:z.string().optional(),defect_type:z.string().optional(),rej_reason:z.string().optional(),defect_class:z.string().optional(),registered_date:z.date().optional(),resolve_date:z.date().optional().nullable()});
export const zPlmDefectQuery = z.object({plm_code:ZodMongoQuery.z$query(zObjectId()),case_code:ZodMongoQuery.z$query(z.string()),plm_link:ZodMongoQuery.z$query(z.string()),title:ZodMongoQuery.z$query(z.string()),priority:ZodMongoQuery.z$query(z.enum(["A","B","C"])),register_by:ZodMongoQuery.z$query(z.string()),user_submit:ZodMongoQuery.z$query(zObjectId()),testcase_id:ZodMongoQuery.z$query(z.string()),cl_number:ZodMongoQuery.z$query(z.string()),problem_status:ZodMongoQuery.z$query(z.enum(["Open","Resolve","Close","Delete"])),resolution_type:ZodMongoQuery.z$query(z.string()),defect_type:ZodMongoQuery.z$query(z.string()),rej_reason:ZodMongoQuery.z$query(z.string()),defect_class:ZodMongoQuery.z$query(z.string()),registered_date:ZodMongoQuery.z$query(z.date()),resolve_date:ZodMongoQuery.z$query(z.date())}).passthrough().partial();
export const zPlmDefectInput = z.object({plm_code:zObjectId().optional(),case_code:z.string(),plm_link:z.string().optional(),title:z.string(),priority:z.enum(["A","B","C"]),register_by:z.string().optional(),user_submit:zObjectId().optional().nullable(),testcase_id:z.string().optional(),cl_number:z.string().optional(),problem_status:z.enum(["Open","Resolve","Close","Delete"]).optional(),resolution_type:z.string().optional(),defect_type:z.string().optional(),rej_reason:z.string().optional(),defect_class:z.string().optional(),registered_date:z.date().optional(),resolve_date:z.date().optional().nullable()});
export const ZodPlmDefectAPIs = getBasicRouteZodIO({
  input: zPlmDefectInput,
  output: zPlmDefectOutput,
  query: zPlmDefectQuery,
},zPlmDefectOutput.keyof());