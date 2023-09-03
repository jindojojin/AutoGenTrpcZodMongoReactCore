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
import {zTaskCheckItemInput, zTaskCheckItemOutput} from './zTaskCheckItem';
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
export const zTaskOutput = z.object({_id:zObjectId(),status:z.enum(["ASSIGNED","ON-GOING","REVIEW-OK","REVIEW-NOK","CLOSE"]).default("ASSIGNED"),assigner:zUserOutput.or(zObjectId()),name:z.string(),detail:z.string().optional(),pic:z.array(zUserOutput.or(zObjectId())),supporter:z.array(zUserOutput.or(zObjectId())).optional(),reviewer:z.array(zUserOutput.or(zObjectId())),plan:z.object({start:z.date(),end:z.date()}),finishTime:z.date().optional(),reviewTime:z.date().optional(),attachments:z.array(zObjectId()).optional()});
export const zTaskQuery = z.object({status:ZodMongoQuery.z$query(z.enum(["ASSIGNED","ON-GOING","REVIEW-OK","REVIEW-NOK","CLOSE"])),assigner:ZodMongoQuery.z$query(zObjectId()),name:ZodMongoQuery.z$query(z.string()),detail:ZodMongoQuery.z$query(z.string()),pic:ZodMongoQuery.z$arrayQuery(ZodMongoQuery.z$query(zObjectId())),supporter:ZodMongoQuery.z$arrayQuery(ZodMongoQuery.z$query(zObjectId())),reviewer:ZodMongoQuery.z$arrayQuery(ZodMongoQuery.z$query(zObjectId())),plan:ZodMongoQuery.z$query(z.object({start:z.date(),end:z.date()})),finishTime:ZodMongoQuery.z$query(z.date()),reviewTime:ZodMongoQuery.z$query(z.date()),attachments:ZodMongoQuery.z$arrayQuery(ZodMongoQuery.z$query(zObjectId()))}).passthrough().partial();
export const zTaskInput = z.object({status:z.enum(["ASSIGNED","ON-GOING","REVIEW-OK","REVIEW-NOK","CLOSE"]).default("ASSIGNED"),assigner:zObjectId(),name:z.string(),detail:z.string().optional(),pic:z.array(zObjectId()),supporter:z.array(zObjectId()).optional(),reviewer:z.array(zObjectId()),plan:z.object({start:z.date(),end:z.date()}),finishTime:z.date().optional(),reviewTime:z.date().optional(),attachments:z.array(zObjectId()).optional()});
export const ZodTaskAPIs = getBasicRouteZodIO({
  input: zTaskInput,
  output: zTaskOutput,
  query: zTaskQuery,
},zTaskOutput.keyof());