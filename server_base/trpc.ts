import {inferAsyncReturnType, initTRPC} from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import superjson from "superjson";
import {verifyJWT} from "./basic-auth/utils/security";

import {AuthorizedUser} from "../share/types/CommonTypes";
import {NODE_CACHE} from "./CacheManager";
import {UserWithScope} from "./basic-auth/utils/getUserAndScopes";
import {DynamicTableCtx} from "./trpc-dynamic-routes/utils/dynamicTableProcedure";
import {ISchemaConfig} from "../share/types/ISchemaConfig";
import {ZodTypeAny} from "zod";
import {getBaseZodFromFieldConfigs} from "./trpc-dynamic-routes/utils/ZodBuilders";

export const createContext = ({
                                  req,
                                  res,
                              }: trpcExpress.CreateExpressContextOptions) => {
    const user = verifyJWT(
        req.header("Authorization")?.split(" ")?.[1],
    ) as AuthorizedUser | null;
    const auth = NODE_CACHE.get<UserWithScope>(user?.loginID ?? "")
    return {user, req, auth};
}; // no context

export type TRPCContext = inferAsyncReturnType<typeof createContext> & {
    SchemaConfig?: ISchemaConfig<any>;
    ZodInput?: ZodTypeAny;
    ZodOutput?: ZodTypeAny;
    ZodBase?: ReturnType<typeof getBaseZodFromFieldConfigs>;
};

const t = initTRPC.context<TRPCContext>().create({
    transformer: superjson,
});

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(
    t.middleware(({ctx, next}) => {
        const token = ctx.req.ip;
        console.log(`Private request from ip: ${ctx.req.ip}`);
        return next({ctx});
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