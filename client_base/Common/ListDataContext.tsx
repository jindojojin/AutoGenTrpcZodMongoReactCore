import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { databaseClient, simplePopulate } from "../../../src/trpc/service";
import { useApiInput, useApiRoute, useFixedQuery } from "../api_hooks/common";
import { SCHEMAS_CONFIG } from "../../../../../../share/schema_configs";
import { APIConfigsContext } from "./APIConfigsContext";

type FilterConfig<T = any> = Partial<{ [k in keyof T]: any }> & any;
type SorterConfig<T = any> = Partial<{ [k in keyof T]: 1 | -1 | undefined }>;

export function useListDataContextValue<T>() {
  const [data, setData] = useState<T[]>();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>();
  const [checkList, setCheckList] = useState<number[]>();
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({});
  const [sorterConfig, setSorterConfig] = useState<SorterConfig>({});
  const [pageConfig, setPageConfig] = useState<{ skip: number; limit: number }>(
    {
      limit: 20,
      skip: 0,
    }
  );
  const {
    config: { schema },
  } = useContext(APIConfigsContext);
  const schemaConfig = SCHEMAS_CONFIG[schema];
  const buildInput = useApiInput();
  const fixedQuery = useFixedQuery();
  const buildQuery = useCallback(
    (skip?: { filter?: boolean; sorter?: boolean; paging?: boolean }) => {
      return {
        where: skip?.filter ? {} : { $and: [filterConfig, ...fixedQuery] },
        options: {
          sort: !skip?.sorter ? sorterConfig : undefined,
          ...(!skip?.paging ? pageConfig : {}),
          populate: simplePopulate(schemaConfig.relationKeys),
        },
      };
    },
    [filterConfig, fixedQuery, sorterConfig, pageConfig]
  );
  const query = useMemo(
    () => buildInput(buildQuery()),
    [buildInput, buildQuery]
  );
  const route = useApiRoute();
  const reload = useCallback(async () => {
    try {
      setLoading(true);
      // @ts-ignore
      const result = await databaseClient[route].findMany.mutate(query);
      setData(result.records);
      setTotal(result.total);
    } catch (error) {
      console.error("FindMany error", error);
    } finally {
      setLoading(false);
    }
  }, [route, query, setData, setTotal]);

  useEffect(() => {
    reload()
      .then((r) => {})
      .catch((e) => console.log(e));
  }, [reload]);

  return {
    data,
    setData,
    loading,
    total,
    setTotal,
    checkList,
    setCheckList,
    reload,
    filterConfig,
    setFilterConfig,
    sorterConfig,
    setSorterConfig,
    pageConfig,
    setPageConfig,
    buildQuery,
  };
}

export const ListDataContext = createContext<
  ReturnType<typeof useListDataContextValue>
>({} as any);