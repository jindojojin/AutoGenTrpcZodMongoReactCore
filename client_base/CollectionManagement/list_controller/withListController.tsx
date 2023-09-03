import React, {
  Component,
  ComponentType,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import { LIST_ACTION, ListConfigProps } from "../configs/ListConfigs";
import { useListDataState } from "./useListDataState";
import useListImportExport from "./useListImportExport";
import { FieldValues } from "react-hook-form";

function UseListController<T>(configs: ListConfigProps<T>) {
  const ListStates = useListDataState<T>(configs.api);
  const getListAPI = useCallback(
    (action: LIST_ACTION, trigger: any) => {
      return !configs.api || !configs.usages?.[action] ? null : trigger;
    },
    [configs]
  );
  const ImportExportAPIs = useListImportExport(configs, getListAPI);

  return {
    ...ListStates,
    ...ImportExportAPIs,
  };
}

export type ControllableListViewRef<T> = {
  refresh?: () => void;
};

export type ControllableListViewProps<T> = {
  listController?: ReturnType<typeof UseListController<T>>;
};

export type ControlledListViewProps<
  T extends FieldValues,
  P extends ControllableListViewProps<T>
> = Omit<P, keyof ControllableListViewProps<T>> & ListConfigProps<T>;

function WithListController<
  T extends FieldValues,
  P extends ControllableListViewProps<T>
>(Component: ComponentType<P>) {
  return forwardRef<ControllableListViewRef<T>, ControlledListViewProps<T, P>>(
    (props, ref) => {
      const controlledProps = UseListController<T>(props);
      useImperativeHandle(
        ref,
        () => ({
          refresh() {
            controlledProps.reload?.();
          },
        }),
        []
      );
      useEffect(() => {
        console.log("API Change");
        controlledProps.reload?.();
      }, [JSON.stringify(props.api)]);
      return <Component listController={controlledProps} {...(props as any)} />;
    }
  );
}

export default WithListController;