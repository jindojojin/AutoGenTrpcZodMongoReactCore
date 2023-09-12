import {ComponentType, forwardRef, useEffect, useImperativeHandle} from "react";
import {FieldValues} from "react-hook-form";
import {ListConfigProps} from "../configs/ListConfigs";
import useListAPI from "./useListAPI";
import {useListDataState} from "./useListDataState";

function UseListController<T>(configs: ListConfigProps<T>) {
  const ListStates = useListDataState<T>(configs.api);
  const ImportExportAPIs = useListAPI(configs);

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