import { FORM_ACTION, FormConfigProps } from "../configs/FormConfigs";
import React, {
  ComponentType,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { FieldValues } from "react-hook-form";
import { useCreateOne } from "../api_hooks/useCreateOne";
import useUpdateOne from "../api_hooks/useUpdateOne";
import useDeleteOne from "../api_hooks/useDeleteOne";
import useFormAPI from "./useFormAPI";

function useFormController<T extends FieldValues>(config: FormConfigProps<T>) {
  const onCreate = useCreateOne(
    config.api,
    config.callbacks?.[FORM_ACTION.CREATE]
  );
  const onUpdate = useUpdateOne(
    config.api,
    config.callbacks?.[FORM_ACTION.UPDATE]
  );
  const onDelete = useDeleteOne(
    config.api,
    config.callbacks?.[FORM_ACTION.DELETE]
  );
  return { onCreate, onDelete, onUpdate };
}

export type ControllableFormViewProps<T extends FieldValues> = {
  initValue: T;
  onSubmit: (value: T) => Promise<boolean>;
};

export type ControllableFormViewRef<T extends FieldValues> = {
  changeMode: (action: FORM_ACTION, value?: T) => void;
};

export type ControlledFormViewProps<
  T extends FieldValues,
  P extends ControllableFormViewProps<T>
> = Omit<P, keyof ControllableFormViewProps<T>> & {
  mode?: FORM_ACTION;
} & FormConfigProps<T>;

function WithFormController<
  T extends FieldValues,
  P extends ControllableFormViewProps<T>
>(Component: ComponentType<P>) {
  return forwardRef<ControllableFormViewRef<T>, ControlledFormViewProps<T, P>>(
    (props, ref) => {
      const { onCreate, onUpdate, onDelete } = useFormAPI<T>(props);
      const [mode, setMode] = useState<FORM_ACTION>(FORM_ACTION.CREATE);
      const [initValue, setInitValue] = useState<T>();
      useImperativeHandle(ref, () => ({
        changeMode: (mode, value) => {
          setMode(mode);
          setInitValue(value);
          console.log(`Change ${mode} value to `, value);
        },
      }));
      const handleSubmit = useCallback(
        (value: T) => {
          console.log(`handle submit ${mode}`, value);
          ({
            [FORM_ACTION.UPDATE]: onUpdate,
            [FORM_ACTION.DELETE]: onDelete,
            [FORM_ACTION.CREATE]: onCreate,
          })[mode]?.(value);
        },
        [onCreate, onUpdate, onDelete, mode]
      );
      return (
        <Component
          {...(props as any)}
          initValue={initValue}
          onSubmit={handleSubmit}
        />
      );
    }
  );
}

export default WithFormController;