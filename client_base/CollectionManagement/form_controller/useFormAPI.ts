import { FORM_ACTION, FormConfigProps } from "../configs/FormConfigs";
import { useCreateOne } from "../api_hooks/useCreateOne";
import useDeleteOne from "../api_hooks/useDeleteOne";
import useUpdateOne from "../api_hooks/useUpdateOne";
import { FieldValues } from "react-hook-form";

function useFormAPI<T extends FieldValues>(config: FormConfigProps<T>) {
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

export default useFormAPI;