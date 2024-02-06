import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { App, Button, ModalProps } from "antd";
import _ from "lodash";
import React, { MutableRefObject, useCallback, useRef, useState } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getObjectKeys } from "../Common/Utils";
import DialogForm, { FormViewProps } from "./DialogForm";
import TableList, { TableListProps } from "./TableList";
import { APICallbacks, APIConfigs } from "./configs/CommonConfig";
import { FORM_ACTION } from "./configs/FormConfigs";
import withFormController, {
  ControllableFormViewRef,
  ControlledFormViewProps,
} from "./form_controller/withFormController";
import withListController, {
  ControllableListViewRef,
  ControlledListViewProps,
} from "./list_controller/withListController";
import {
  useFormUsagesByUserScopes,
  useListUsagesByUserScopes,
} from "./utils/useFormUsagesByUserScopes";

type DbCollectionViewProps<
    T extends FieldValues,
    TName extends FieldPath<T> = FieldPath<T>,
> = {
  apiConfig: APIConfigs;
  formContainer?: ModalProps;
  tableConfig: Omit<ControlledListViewProps<T, TableListProps<T>>, "api">;
  formConfig:
      | Record<
      FORM_ACTION,
      Omit<ControlledFormViewProps<T, FormViewProps<T>>, "api">
  >
      | Omit<ControlledFormViewProps<T, FormViewProps<T>>, "api">;
  tableRef?: React.MutableRefObject<ControllableListViewRef<T>>;
  formRef?: React.MutableRefObject<ControllableFormViewRef<T>>;
};

const TableComponent = withListController(TableList);
const FormComponent = withFormController(DialogForm);
function useFormProps<T extends FieldValues>(
    openForm: FORM_ACTION | undefined,
    showForm: (a: FORM_ACTION | undefined, v?: T) => void,
    props: DbCollectionViewProps<T>,
    listRef: MutableRefObject<any>,
): ControlledFormViewProps<T, FormViewProps<T>> {
  const { notification } = App.useApp();
  const { t } = useTranslation("crud");
  const { t: tForm } = useTranslation("form");
  const FormProps =
      openForm && Object.hasOwn(props.formConfig, openForm as FORM_ACTION)
          ? (props.formConfig as any)[openForm]
          : props.formConfig;

  return {
    usages: useFormUsagesByUserScopes(props.apiConfig.schema),
    callbacks: Object.values(FORM_ACTION).reduce(
        (prev, act) => ({
          ...prev,
          [act]: {
            onSuccess: () => {
              listRef.current?.refresh?.();
              notification.success({
                message: {
                  [FORM_ACTION.CREATE]: t("createSuccess", {
                    name: props.apiConfig.schema,
                  }),
                  [FORM_ACTION.UPDATE]: t("updateSuccess", {
                    name: props.apiConfig.schema,
                  }),
                  [FORM_ACTION.DELETE]: t("deleteSuccess", {
                    name: props.apiConfig.schema,
                  }),
                }[act],
              });
              showForm(undefined);
            },
            onError: (e) => {
              notification.error({
                message: e,
              });
            },
          } as APICallbacks<T>,
        }),
        {},
    ),
    modalProps: {
      [FORM_ACTION.CREATE]: {
        title: tForm("createTitle", { name: FormProps.label }),
        okText: tForm("createOkBtn"),
        okType: "primary",
      },
      [FORM_ACTION.UPDATE]: {
        title: tForm("updateTitle", { name: FormProps.label }),
        okText: tForm("updateOkBtn"),
        okType: "primary",
      },
      [FORM_ACTION.DELETE]: {
        title: tForm("deleteTitle", { name: FormProps.label }),
        okText: tForm("deleteOkBtn"),
        okType: "danger",
      },
    }[String(openForm)],
    api: props.apiConfig,
    mode: openForm,
    ...FormProps,
  };
}

function useTableProps<T extends FieldValues>(
    showForm: (a: FORM_ACTION | undefined, v?: T) => void,
    props: DbCollectionViewProps<T>,
    formProps: ControlledFormViewProps<T, FormViewProps<T>>,
): ControlledListViewProps<T, TableListProps<T>> {
  const rowActions = {
    [FORM_ACTION.CREATE]: {
      icon: <PlusOutlined />,
      label: "Create new",
      onSelect: (_v: T) => showForm(FORM_ACTION.CREATE),
    },
    [FORM_ACTION.UPDATE]: {
      icon: <EditOutlined />,
      label: "Update",
      onSelect: (v: T) => {
        console.log(v);
        showForm(FORM_ACTION.UPDATE, v);
      },
    },
    [FORM_ACTION.DELETE]: {
      icon: <DeleteOutlined />,
      label: "Delete",
      danger: true,
      onSelect: (v: T) => showForm(FORM_ACTION.DELETE, v),
    },
  };
  return {
    usages: useListUsagesByUserScopes(props.apiConfig.schema),
    headerAdditions: _.compact([
      formProps.usages?.Create ? (
          <Button
              size="small"
              onClick={() => {
                console.log("Click create, not working");
                showForm(FORM_ACTION.CREATE);
              }}
              icon={<PlusOutlined title={"Create"} />}
          >
            Add
          </Button>
      ) : null,
    ]),
    rowAdditionActions: {
      ...props.tableConfig.rowAdditionActions,
      contextMenuItems: [
        ...getObjectKeys(rowActions)
        .filter((action) => formProps.usages?.[action] ?? true)
        .map((action) => rowActions[action]),
        ...(props.tableConfig.rowAdditionActions?.contextMenuItems ?? []),
      ],
    },
    api: props.apiConfig,
    ..._.omit(props.tableConfig, ["rowAdditionActions"]),
  };
}

function DbCollectionView<T extends FieldValues>(
    props: DbCollectionViewProps<T>,
) {
  const [openForm, setOpenForm] = useState<FORM_ACTION | undefined>(undefined);
  const formRef = props.formRef ?? useRef<ControllableFormViewRef<T>>();
  const listRef = props.tableRef ?? useRef<ControllableListViewRef<T>>();

  const showForm = useCallback((mode: FORM_ACTION | undefined, value?: T) => {
    if (mode) formRef.current?.changeMode(mode, value);
    setOpenForm(mode);
  }, []);

  const formProps = useFormProps(openForm, showForm, props, listRef);
  const tableProps = useTableProps(showForm, props, formProps);
  return (
      <>
        <FormComponent
            {...(_.omit(formProps, ["modalProps"]) as any)}
            modalProps={{
              ...formProps.modalProps,
              open: openForm != undefined,
              onCancel: () => showForm(undefined),
            }}
            ref={formRef as any}
        />
        <TableComponent
            {...(tableProps as any)}
            api={props.apiConfig}
            ref={listRef as any}
        />
      </>
  );
}

export default DbCollectionView;
