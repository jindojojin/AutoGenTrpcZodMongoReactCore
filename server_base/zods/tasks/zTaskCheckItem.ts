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
import {zTaskInput, zTaskOutput} from './zTask';
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
export const zTaskCheckItemOutput = z.object({_id:zObjectId(),task:zTaskOutput.or(zObjectId()),description:z.string(),pic:zUserOutput.or(zObjectId()).optional(),reviewer:zUserOutput.or(zObjectId()).optional(),finishTime:z.date().optional(),reviewTime:z.date().optional(),result:z.enum(["PASS","FAIL"]).optional(),score:z.number().optional(),comment:z.string().optional()});
export const zTaskCheckItemQuery = z.object({task:ZodMongoQuery.z$query(zObjectId()),description:ZodMongoQuery.z$query(z.string()),pic:ZodMongoQuery.z$query(zObjectId()),reviewer:ZodMongoQuery.z$query(zObjectId()),finishTime:ZodMongoQuery.z$query(z.date()),reviewTime:ZodMongoQuery.z$query(z.date()),result:ZodMongoQuery.z$query(z.enum(["PASS","FAIL"])),score:ZodMongoQuery.z$query(z.number()),comment:ZodMongoQuery.z$query(z.string())}).passthrough().partial();
export const zTaskCheckItemInput = z.object({task:zObjectId(),description:z.string(),pic:zObjectId().optional(),reviewer:zObjectId().optional(),finishTime:z.date().optional(),reviewTime:z.date().optional(),result:z.enum(["PASS","FAIL"]).optional(),score:z.number().optional(),comment:z.string().optional()});
export const ZodTaskCheckItemAPIs = getBasicRouteZodIO({
  input: zTaskCheckItemInput,
  output: zTaskCheckItemOutput,
  query: zTaskCheckItemQuery,
},zTaskCheckItemOutput.keyof());