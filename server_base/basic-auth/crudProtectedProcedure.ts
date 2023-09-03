import { DATABASE_ACTIONS } from "../../share/constants/authentication";
import { action2scope, ADMIN_SCOPE } from "../../share/ScopeUtils";
import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from "../trpc";
import { getSystemScopes } from "./utils/getSystemScopes";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

export const crudProtectedProcedure = (
  schema: SCHEMA_TYPE,
  action: DATABASE_ACTIONS,
  fields?: string[],
) =>
  publicProcedure.use(
    middleware(async ({ next, ctx }) => {
      const systemScopes = await getSystemScopes();
      if (!ctx.user?.scopes?.includes(ADMIN_SCOPE))
        switch (action) {
          case DATABASE_ACTIONS.CREATE:
            const createScope = action2scope(schema, DATABASE_ACTIONS.CREATE);
            if (
              systemScopes.includes(createScope) &&
              (!ctx?.user?.scopes || !ctx.user?.scopes?.includes(createScope))
            ) {
              throw new TRPCError({
                code: "FORBIDDEN",
                message: `User do not have permission to create new ${schema}`,
              });
            }
            break;
          case DATABASE_ACTIONS.DELETE:
            const deleteScope = action2scope(schema, DATABASE_ACTIONS.DELETE);
            if (
              systemScopes.includes(deleteScope) &&
              (!ctx?.user?.scopes || !ctx.user?.scopes?.includes(deleteScope))
            ) {
              throw new TRPCError({
                code: "FORBIDDEN",
                message: `User do not have permission to delete ${schema}`,
              });
            }
            break;
          case DATABASE_ACTIONS.READ:
            break;
          case DATABASE_ACTIONS.UPDATE:
            break;
        }
      return next({ ctx });
    }),
  );
