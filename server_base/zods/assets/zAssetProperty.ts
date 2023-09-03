import { z } from "zod";
import {zAssetLogInput, zAssetLogOutput} from './zAssetLog';
import {zAssetInput, zAssetOutput} from './zAsset';
import {zAssetCategoryLogInput, zAssetCategoryLogOutput} from './zAssetCategoryLog';
import {zAssetCategoryInput, zAssetCategoryOutput} from './zAssetCategory';
import {zAssetPropertyLogInput, zAssetPropertyLogOutput} from './zAssetPropertyLog';
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
export const zAssetPropertyOutput = z.object({_id:zObjectId(),_dynamic_category_:zAssetCategoryOutput.or(zObjectId()).optional(),label:z.string(),type:z.enum(["Date","DateRange","Time","DateTime","DateTimeRange","String","Number","Enum","Boolean","Unknown","File","Image","Video","Audio"]).optional().default("Unknown"),enum:z.array(z.string()).optional().nullable(),hint:z.string().optional(),required:z.boolean().optional().default(false),nullable:z.boolean().optional().default(false),importKey:z.boolean().optional().default(false),exportKey:z.boolean().optional().default(false),searchKey:z.boolean().optional().default(false),unique:z.boolean().optional(),enumLabel:z.array(z.string()).optional(),min:z.number().optional(),max:z.number().optional(),default:z.any().optional(),orderIdx:z.number().optional(),hidden:z.boolean().optional(),immutable:z.boolean().optional()});
export const zAssetPropertyQuery = z.object({_dynamic_category_:ZodMongoQuery.z$query(zObjectId()),label:ZodMongoQuery.z$query(z.string()),type:ZodMongoQuery.z$query(z.enum(["Date","DateRange","Time","DateTime","DateTimeRange","String","Number","Enum","Boolean","Unknown","File","Image","Video","Audio"])),enum:ZodMongoQuery.z$arrayQuery(ZodMongoQuery.z$query(z.string())),hint:ZodMongoQuery.z$query(z.string()),required:ZodMongoQuery.z$query(z.boolean()),nullable:ZodMongoQuery.z$query(z.boolean()),importKey:ZodMongoQuery.z$query(z.boolean()),exportKey:ZodMongoQuery.z$query(z.boolean()),searchKey:ZodMongoQuery.z$query(z.boolean()),unique:ZodMongoQuery.z$query(z.boolean()),enumLabel:ZodMongoQuery.z$arrayQuery(ZodMongoQuery.z$query(z.string())),min:ZodMongoQuery.z$query(z.number()),max:ZodMongoQuery.z$query(z.number()),default:ZodMongoQuery.z$query(z.any()),orderIdx:ZodMongoQuery.z$query(z.number()),hidden:ZodMongoQuery.z$query(z.boolean()),immutable:ZodMongoQuery.z$query(z.boolean())}).passthrough().partial();
export const zAssetPropertyInput = z.object({_dynamic_category_:zObjectId().optional(),label:z.string(),type:z.enum(["Date","DateRange","Time","DateTime","DateTimeRange","String","Number","Enum","Boolean","Unknown","File","Image","Video","Audio"]).optional().default("Unknown"),enum:z.array(z.string()).optional().nullable(),hint:z.string().optional(),required:z.boolean().optional().default(false),nullable:z.boolean().optional().default(false),importKey:z.boolean().optional().default(false),exportKey:z.boolean().optional().default(false),searchKey:z.boolean().optional().default(false),unique:z.boolean().optional(),enumLabel:z.array(z.string()).optional(),min:z.number().optional(),max:z.number().optional(),default:z.any().optional(),orderIdx:z.number().optional(),hidden:z.boolean().optional(),immutable:z.boolean().optional()});
export const ZodAssetPropertyAPIs = getBasicRouteZodIO({
  input: zAssetPropertyInput,
  output: zAssetPropertyOutput,
  query: zAssetPropertyQuery,
},zAssetPropertyOutput.keyof());