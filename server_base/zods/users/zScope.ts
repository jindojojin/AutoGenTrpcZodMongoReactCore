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
import {zUserInput, zUserOutput} from './zUser';
import {zUserScopeInput, zUserScopeOutput} from './zUserScope';
import {
 ZodMongoQuery,
 zObjectId,
} from "../../zodUtils";
import {zUpsertOutput} from "../../database-functions/upsertMany";
import {zImportOutput} from "../../database-functions/importMany";
import {getBasicRouteZodIO} from "../../trpc-dynamic-routes/utils/ZodBuilders";
export const zScopeOutput = z.object({_id:zObjectId(),name:z.string(),actions:z.array(z.string()),table:z.enum(["User","Scope","User Group","Project","Test Project","PLM Code","PLM Defect","TTv2 Test suite","TTv2 Test set","TTv2 Testcase","Task","Task Check Item","Asset","Asset Log","Asset Invoice","Asset Invoice Log","Asset Category","Asset Category Log","Asset Pic","Asset Pic Log","Asset Property","Asset Property Log"]),fields:z.array(z.string())});
export const zScopeQuery = z.object({name:ZodMongoQuery.z$query(z.string()),actions:ZodMongoQuery.z$arrayQuery(ZodMongoQuery.z$query(z.string())),table:ZodMongoQuery.z$query(z.enum(["User","Scope","User Group","Project","Test Project","PLM Code","PLM Defect","TTv2 Test suite","TTv2 Test set","TTv2 Testcase","Task","Task Check Item","Asset","Asset Log","Asset Invoice","Asset Invoice Log","Asset Category","Asset Category Log","Asset Pic","Asset Pic Log","Asset Property","Asset Property Log"])),fields:ZodMongoQuery.z$arrayQuery(ZodMongoQuery.z$query(z.string()))}).passthrough().partial();
export const zScopeInput = z.object({name:z.string(),actions:z.array(z.string()),table:z.enum(["User","Scope","User Group","Project","Test Project","PLM Code","PLM Defect","TTv2 Test suite","TTv2 Test set","TTv2 Testcase","Task","Task Check Item","Asset","Asset Log","Asset Invoice","Asset Invoice Log","Asset Category","Asset Category Log","Asset Pic","Asset Pic Log","Asset Property","Asset Property Log"]),fields:z.array(z.string())});
export const ZodScopeAPIs = getBasicRouteZodIO({
  input: zScopeInput,
  output: zScopeOutput,
  query: zScopeQuery,
},zScopeOutput.keyof());