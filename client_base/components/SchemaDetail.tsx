import React from "react";
import { ISchemaConfig } from "../../share/types/ISchemaConfig";
import { App, Button, Card, Descriptions, Space } from "antd";
import HighlightedText from "./HighlightedText";
import {getObjectKeys} from "../Common/Utils";

interface ISchemaDetailProps<T> {
  SchemaConfig?: ISchemaConfig<T>;
  data: T;
}

export function SchemaDetail<T>(props: ISchemaDetailProps<T>) {
  return (
    <Descriptions bordered size={"small"}>
      {getObjectKeys(props.SchemaConfig?.fieldConfigs ?? props.data).map(
        (key) => (
          <Descriptions.Item
            label={props.SchemaConfig?.fieldConfigs[key]?.label}
          >
            {String(props.data[key])}
          </Descriptions.Item>
        )
      )}
    </Descriptions>
  );
}

interface ISchemaQuickViewProps {
  SchemaConfig?: ISchemaConfig<any>;
  data: any;
  highlightWords?: string[];
}

export function SchemaQuickView(props: ISchemaQuickViewProps) {
  const { modal } = App.useApp();
  console.log("Schemaconfig",props.SchemaConfig)
  return (
    <Card
      type={"inner"}
      style={{
        flex: 1,
      }}
      bordered={true}
      title={props.SchemaConfig?.name}
      size={"small"}
      extra={
        <Button
          block
          type={"link"}
          onClick={() => {
            modal.info({
              width: "80%",
              title: props.SchemaConfig?.name,
              content: (
                <SchemaDetail
                  SchemaConfig={props.SchemaConfig}
                  data={props.data}
                />
              ),
            });
          }}
        >
          Detail
        </Button>
      }
    >
      {props.SchemaConfig?.exportKeys.map((key) => (
        <Space
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>
            <strong>
              {props.SchemaConfig?.fieldConfigs[key]?.label + ": "}
            </strong>
          </span>
          <HighlightedText
            text={props.data[key]}
            highlightWords={props.highlightWords}
          />
        </Space>
      ))}
    </Card>
  );
}