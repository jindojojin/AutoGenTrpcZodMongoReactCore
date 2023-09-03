import { SCHEMA_TYPE } from "../../../share/types/DataTypes";
import { useCallback, useEffect, useState } from "react";
import { databaseClient } from "../../../../src/trpc/service";
import { DATABASE_APIS } from "../../../share/constants/database_apis";
function useFindMany<T>(
  schema: SCHEMA_TYPE,
  where: any,
  select: any = undefined,
  options: any = undefined
) {
  const [data, setData] = useState<T[] | undefined>();
  const [loading, setLoading] = useState(false);
  const reload = useCallback(async () => {
    try {
      setLoading(true);
      // @ts-ignore
      const res = (await databaseClient[DATABASE_APIS[schema]].findMany.mutate({
        where,
        select,
        options,
      })) as any;
      setData(res.records as T[]);
    } catch (e) {
      console.error("FindMany error", e);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(where), JSON.stringify(select), JSON.stringify(options)]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, reload, loading };
}

export default useFindMany;