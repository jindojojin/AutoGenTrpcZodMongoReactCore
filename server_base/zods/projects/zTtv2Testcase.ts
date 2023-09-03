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
import {zTtv2TestSetInput, zTtv2TestSetOutput} from './zTtv2TestSet';
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
export const zTtv2TestcaseOutput = z.object({_id:zObjectId(),id:z.number().optional(),top:zTtv2TestSetOutput.or(zObjectId()).optional(),pid:zObjectId().optional().nullable(),tcid:z.number().optional(),title:z.string().optional(),state:z.enum(["READY","SKIPPED","TESTING","PAUSE","TEST_NOK","TEST_OK","REVIEWING","REVIEW_PAUSE","REVIEW_NOK","REVIEW_OK","TEST_SUITE_RUNNING","TEST_SUITE_STOPPED"]).optional(),tester:zUserOutput.or(zObjectId()).optional().nullable(),reviewer:zUserOutput.or(zObjectId()).optional().nullable(),assigned_tester:zUserOutput.or(zObjectId()).optional().nullable(),assigned_reviewer:zUserOutput.or(zObjectId()).optional().nullable(),due_test:z.date().optional(),due_review:z.date().optional()});
export const zTtv2TestcaseQuery = z.object({id:ZodMongoQuery.z$query(z.number()),top:ZodMongoQuery.z$query(zObjectId()),pid:ZodMongoQuery.z$query(zObjectId()),tcid:ZodMongoQuery.z$query(z.number()),title:ZodMongoQuery.z$query(z.string()),state:ZodMongoQuery.z$query(z.enum(["READY","SKIPPED","TESTING","PAUSE","TEST_NOK","TEST_OK","REVIEWING","REVIEW_PAUSE","REVIEW_NOK","REVIEW_OK","TEST_SUITE_RUNNING","TEST_SUITE_STOPPED"])),tester:ZodMongoQuery.z$query(zObjectId()),reviewer:ZodMongoQuery.z$query(zObjectId()),assigned_tester:ZodMongoQuery.z$query(zObjectId()),assigned_reviewer:ZodMongoQuery.z$query(zObjectId()),due_test:ZodMongoQuery.z$query(z.date()),due_review:ZodMongoQuery.z$query(z.date())}).passthrough().partial();
export const zTtv2TestcaseInput = z.object({id:z.number().optional(),top:zObjectId().optional(),pid:zObjectId().optional().nullable(),tcid:z.number().optional(),title:z.string().optional(),state:z.enum(["READY","SKIPPED","TESTING","PAUSE","TEST_NOK","TEST_OK","REVIEWING","REVIEW_PAUSE","REVIEW_NOK","REVIEW_OK","TEST_SUITE_RUNNING","TEST_SUITE_STOPPED"]).optional(),tester:zObjectId().optional().nullable(),reviewer:zObjectId().optional().nullable(),assigned_tester:zObjectId().optional().nullable(),assigned_reviewer:zObjectId().optional().nullable(),due_test:z.date().optional(),due_review:z.date().optional()});
export const ZodTtv2TestcaseAPIs = getBasicRouteZodIO({
  input: zTtv2TestcaseInput,
  output: zTtv2TestcaseOutput,
  query: zTtv2TestcaseQuery,
},zTtv2TestcaseOutput.keyof());