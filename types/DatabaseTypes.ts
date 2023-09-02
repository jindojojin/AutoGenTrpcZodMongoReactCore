// This file is template for import type purpose
export type Scope = {
    _id: string,
    name: string,
    actions: ("Create" | "Read" | "Update" | "Delete")[],
    table: "User" | "Scope"
    fields: (string)[]
};
export type User = {
    _id: string,
    _user_login_id_: string,
    _user_login_pwd_?: string,
    _user_login_salt_?: string,
};
export type UserScope = {
    _id: string,
    top?: (string | UserScope) | null,
    name: string,
    members?: ((string | User))[],
    scopes?: ((string | Scope))[]
}