// created for each request
export type AuthorizedUser = {
  loginID: string;
  scopes: string[];
};

export type DateRange = {
  start: Date;
  end: Date;
};