import z from "zod";
import { random } from "lodash";
import { createJWT, generateRandomPassword, md5 } from "./utils/security";
import { privateProcedure, publicProcedure, router } from "../trpc";
import {
    AUTH_USER_ID_FIELD,
    AUTH_USER_PWD_FIELD,
    AUTH_USER_SALT_FIELD,
} from "../../share/constants/database_fields";

import type { AuthorizedUser } from "../../share/types/CommonTypes";
import { getSystemScopes } from "./utils/getSystemScopes";
import { DATABASE_MODELS } from "../mongoose/DatabaseModels";
import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { getUserScopes } from "./utils/getUserScopes";

const zActiveUsersInput = z.object({
    users: z.string().array(),
    password: z.string().optional(), // password mặc định = random
});
const zActiveUsersOutput = z
.object({
    userId: z.string(),
    password: z.string(),
})
.array();

export async function doActiveUsers(input: z.infer<typeof zActiveUsersInput>) {
    const listUpdate = await DATABASE_MODELS[SCHEMA_TYPE.USER].find({
        userId: {$in: input.users},
    });
    const passMap: { [k: string]: string } = {};
    listUpdate.forEach((userDoc) => {
        const salt = md5(random(1000, 10000, true).toString());
        const pass = input.password ?? generateRandomPassword(6);
        passMap[String(userDoc[AUTH_USER_ID_FIELD])] = pass;
        userDoc[AUTH_USER_PWD_FIELD] = md5(pass + salt);
        userDoc[AUTH_USER_SALT_FIELD] = salt;
    });
    await DATABASE_MODELS[SCHEMA_TYPE.USER].bulkSave(listUpdate);
    return listUpdate.map((u) => ({
        userId: u[AUTH_USER_ID_FIELD],
        password: passMap[String(u[AUTH_USER_ID_FIELD])],
    })) as any;
}

const zCheckUserAuth = z.object({
    username: z.string(),
    password: z.string(),
});

export async function doCheckUserAuth(input: z.infer<typeof zCheckUserAuth>) {
    if (
        process.env.SYSTEM_ADMIN == input.username &&
        process.env.SYSTEM_ADMIN_PWD == input.password
    )
        return true;

    const user = await DATABASE_MODELS[SCHEMA_TYPE.USER].findOne({
        [AUTH_USER_ID_FIELD]: input.username,
    });
    if (!user) {
        throw new Error(`Người dùng ${input.username} không tồn tại!`);
    } else {
        if (
            md5(input.password + user[AUTH_USER_SALT_FIELD]) ===
            user[AUTH_USER_PWD_FIELD]
        ) {
            return true;
        } else {
            throw new Error(`Mật khẩu không chính xác!`);
        }
    }
}

export const AuthRouter = router({
    getUserToken: privateProcedure.input(z.string()).query(async ({ input }) => {
        // const scopes = await getUserScopes(input);
        return createJWT<AuthorizedUser>({ loginID: input, scopes: [] });
    }),

    getSystemScopes: publicProcedure.query(getSystemScopes),
    getUserScopes: publicProcedure.query(({ ctx }) =>
        getUserScopes(ctx?.user?.loginID),
    ),

    activeUsers: privateProcedure
    .input(zActiveUsersInput)
    .output(zActiveUsersOutput)
    .mutation(({ input }) => doActiveUsers(input)),

    checkUserAuth: publicProcedure
    .input(zCheckUserAuth)
    .output(z.boolean())
    .mutation(({ input }) => doCheckUserAuth(input)),
});