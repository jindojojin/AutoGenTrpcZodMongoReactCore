import {inferAsyncReturnType, initTRPC} from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import superjson from "superjson";
import {ZodTypeAny} from "zod";
import {getBaseZodFromFieldConfigs} from "./trpc-dynamic-routes/utils/ZodBuilders";
import {ISchemaConfig} from "../share/types/ISchemaConfig";
import {verifyJWT} from "./basic-auth/utils/security";

import {AuthorizedUser} from "../share/types/CommonTypes";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const user = verifyJWT(
    req.header("Authorization")?.split(" ")?.[1],
  ) as AuthorizedUser | null;
  return { user, req };
}; // no context

type Context = inferAsyncReturnType<typeof createContext> & {
  SchemaConfig?: ISchemaConfig<any>;
  ZodInput?: ZodTypeAny;
  ZodOutput?: ZodTypeAny;
  ZodBase?: ReturnType<typeof getBaseZodFromFieldConfigs>;
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(
  t.middleware(({ ctx, next }) => {
    const token = ctx.req.ip;
    console.log(`Private request from ip: ${ctx.req.ip}`);
    return next({ ctx });
  }),
);
export const mergeRouters = t.mergeRouters;

function normalizeJsonUnicode(jsonObj: any): any {
  if (typeof jsonObj === "string") {
    return jsonObj.normalize("NFKD");
  } else if (Array.isArray(jsonObj)) {
    return jsonObj.map((item) => normalizeJsonUnicode(item));
  } else if (typeof jsonObj === "object") {
    const normalizedObj: any = {};
    for (const key in jsonObj) {
      if (jsonObj.hasOwnProperty(key)) {
        normalizedObj[key] = normalizeJsonUnicode(jsonObj[key]);
      }
    }
    return normalizedObj;
  }
  return jsonObj;
}