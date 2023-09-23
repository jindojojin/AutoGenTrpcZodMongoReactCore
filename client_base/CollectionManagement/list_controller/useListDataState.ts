import {useCallback, useEffect, useMemo, useState} from "react";
import {databaseClient, simplePopulate} from "../../../../src/trpc/service";
import {APIConfigs} from "../configs/CommonConfig";
import {useApiInput, useApiRoute, useFixedQuery} from "../api_hooks/common";
import {SCHEMAS_CONFIG} from "../../../share/schema_configs";
import _ from "lodash"

type FilterConfig<T = any> = Partial<{ [k in keyof T]: any }> & any;
type SorterConfig<T = any> = Partial<{ [k in keyof T]: 1 | -1 | undefined }>;

export function useListDataState<T>(config: APIConfigs) {
  const [data, setData] = useState<T[]>();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>();
  const [checkList, setCheckList] = useState<number[]>();
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({});
  const [sorterConfig, setSorterConfig] = useState<SorterConfig>(config.initSort);
  const [pageConfig, setPageConfig] = useState<{ skip: number; limit: number }>(
      {
        limit: 10,
        skip: 0,
      }
  );

  const schemaConfig = SCHEMAS_CONFIG[config.schema];
  const route = useApiRoute(config);
  const buildInput = useApiInput(config);
  const fixedQuery = useFixedQuery(config);
  const buildQuery = useCallback(
      (skip?: { filter?: boolean; sorter?: boolean; paging?: boolean }) => {
        return {
          where: skip?.filter ? {} : {$and: [filterConfig, ...fixedQuery]},
          options: {
            sort: !skip?.sorter ? _.merge(config.initSort, sorterConfig) : undefined,
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
  const reload = useCallback(async () => {
    setLoading(true);
    try {
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
    .then((r) => {
    })
    .catch((e) => console.log(e));
  }, [
    JSON.stringify(filterConfig),
    JSON.stringify(sorterConfig),
    JSON.stringify(pageConfig),
  ]);

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