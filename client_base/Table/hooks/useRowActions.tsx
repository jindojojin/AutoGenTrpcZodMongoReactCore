import React, { useMemo, useRef, useState } from "react";
import { Button, ButtonProps, Card, Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { v4 as uuid } from "uuid";
import { showIf } from "../../Common/Utils";
import { ButtonGroupProps } from "antd/es/button";
import { ColumnType } from "antd/es/table";

type ContextItem<T> = Partial<ItemType> & {
  onSelect?: (data: T) => void;
  children?: ContextItem<T>[];
};

export type RowActionConfig<T> = {
  contextMenuItems?: ContextItem<T>[];
  onClick?: (data: T) => void;
  onDoubleClick?: (data: T) => void;
  actionButtons?: {
    buttonProps?: ButtonProps;
    onClick?: (data: T) => void;
    text?: string;
  }[];
  actionButtonColumnConfig?: Partial<ColumnType<T>>;
  actionButtonContainerProps?: ButtonGroupProps;
};
function useRowActions<T>(config: RowActionConfig<T>) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const { actionsMap, indexedMenuItems } = useMemo(() => {
    let _actionsMap: { [key: string]: ((data: T) => void) | undefined } = {};
    function extractItem(item: ContextItem<T>): ItemType {
      const _key = uuid();
      _actionsMap[_key] = item.onSelect;
      return {
        ...item,
        key: _key,
        children: item.children?.map((i) => extractItem(i)),
      } as unknown as ItemType;
    }
    let MenuItems: ItemType[] | undefined = config.contextMenuItems?.map((i) =>
      extractItem(i)
    );
    return { actionsMap: _actionsMap, indexedMenuItems: MenuItems };
  }, [config.contextMenuItems]);
  const targetRef = useRef(null);
  const ContextMenuComponent = () =>
    showIf(
      showContextMenu,
      <div
        style={{
          position: "fixed",
          padding: 5000,
          zIndex: 100,
          top: contextMenuPos.y - 5000,
          left: contextMenuPos.x - 5000,
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContextMenu(false);
        }}
        onClick={() => setShowContextMenu(false)}
      >
        <Card
          bordered={true}
          size={"small"}
          bodyStyle={{
            padding: 0,
            borderRadius: 10,
            zIndex: 101,
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
          }}
          style={{
            padding: 0,
          }}
        >
          <Menu
            onSelect={(item) => {
              actionsMap[item.key]?.(selectedItems[0]);
              setShowContextMenu(false);
            }}
            style={{
              minWidth: 200,
              border: 0,
              borderRadius: 10,
            }}
            items={indexedMenuItems}
          />
        </Card>
      </div>
    );
  const RowActionConfig = useMemo(
    () => ({
      onRow: (data: T, _index: number) => ({
        onClick: (_e: any) => {
          config.onClick?.(data);
        },
        onDoubleClick: (_e: any) => {
          config.onDoubleClick?.(data);
        },
        onContextMenu: (_e: any) => {
            console.log("On context menu", _e);
          if (config.contextMenuItems && config.contextMenuItems.length) {
            console.log(_e);
            setSelectedItems([data]);
            _e.preventDefault();
            setContextMenuPos({ x: _e.clientX, y: _e.clientY });
            setShowContextMenu(true);
          }
        },
      }),
    }),
    [config.contextMenuItems?.length]
  );

  const ActionsColumn: ColumnType<T> | undefined = useMemo(
    () =>
      !config.actionButtons?.length
        ? undefined
        : {
            title: "Actions",
            align: "center",
            fixed: "right",
            ...(config.actionButtonColumnConfig ?? {}),
            render: (_v, record: T) => (
              <Button.Group {...config.actionButtonContainerProps}>
                {config.actionButtons?.map((btnCfg) => (
                  <Button
                    {...btnCfg.buttonProps}
                    onClick={() => btnCfg.onClick?.(record)}
                  >
                    {btnCfg.text ?? ""}
                  </Button>
                ))}
              </Button.Group>
            ),
          },
    [config.actionButtons?.length, config.actionButtonContainerProps]
  );

  return {
    ContextMenuComponent,
    RowActionConfig: RowActionConfig as any,
    ActionsColumn,
  };
}

export default useRowActions;