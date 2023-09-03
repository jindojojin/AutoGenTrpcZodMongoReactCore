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
import {zUserScopeInput, zUserScopeOutput} from './zUserScope';
import {
 ZodMongoQuery,
 zObjectId,
} from "../../zodUtils";
import {zUpsertOutput} from "../../database-functions/upsertMany";
import {zImportOutput} from "../../database-functions/importMany";
import {getBasicRouteZodIO} from "../../trpc-dynamic-routes/utils/ZodBuilders";
export const zUserOutput = z.object({_id:zObjectId(),_user_login_id_:z.string(),fullName:z.string().optional(),employeeNumber:z.string().optional(),epId:z.string().optional(),emailAddress:z.string().optional(),avatar:zObjectId().optional(),ttv2ID:z.number().optional(),nickName:z.string().optional().nullable(),birthday:z.date().optional(),external:z.boolean().optional()});
export const zUserQuery = z.object({_user_login_id_:ZodMongoQuery.z$query(z.string()),fullName:ZodMongoQuery.z$query(z.string()),employeeNumber:ZodMongoQuery.z$query(z.string()),epId:ZodMongoQuery.z$query(z.string()),emailAddress:ZodMongoQuery.z$query(z.string()),avatar:ZodMongoQuery.z$query(zObjectId()),ttv2ID:ZodMongoQuery.z$query(z.number()),nickName:ZodMongoQuery.z$query(z.string()),birthday:ZodMongoQuery.z$query(z.date()),external:ZodMongoQuery.z$query(z.boolean())}).passthrough().partial();
export const zUserInput = z.object({_user_login_id_:z.string(),fullName:z.string().optional(),employeeNumber:z.string().optional(),epId:z.string().optional(),emailAddress:z.string().optional(),avatar:zObjectId().optional(),ttv2ID:z.number().optional(),nickName:z.string().optional().nullable(),birthday:z.date().optional(),external:z.boolean().optional()});
export const ZodUserAPIs = getBasicRouteZodIO({
  input: zUserInput,
  output: zUserOutput,
  query: zUserQuery,
},zUserOutput.keyof());