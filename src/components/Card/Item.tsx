import React, { useEffect } from "react";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import { Card, CardHeader, Button } from "@nextui-org/react";

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: React.ReactNode;
  onRemove?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: Props["transform"];
    transition: Props["transition"];
    value: Props["value"];
  }): React.ReactElement;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <li
          //   className={classNames(
          //     styles.Wrapper,
          //     fadeIn && styles.fadeIn,
          //     sorting && styles.sorting,
          //     dragOverlay && styles.dragOverlay
          //   )}
          className={`${fadeIn ? "animation-spin" : ""} ${
            dragOverlay ? "list-none" : ""
          } origin-top-left touch-manipulation ${
            transform
              ? `${
                  Math.round(transform.x) >= 0 ? "" : "-"
                }translate-x-[${Math.abs(Math.round(transform.x))}px]`
              : ""
          } ${
            transform
              ? `${
                  Math.round(transform.y) >= 0 ? "" : "-"
                }translate-y-[${Math.abs(Math.round(transform.y))}px]`
              : ""
          } ${
            transform?.scaleX ? `scale-x-[${Math.round(transform.scaleX)}]` : ""
          } ${
            transform?.scaleY ? `scale-y-[${Math.round(transform.scaleY)}]` : ""
          } ${color ? `bg-[${color}]` : ""}
          `}
          style={
            {
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(", "),
              "--index": index,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <Card
            className={`py-4 w-[260px] ${
              !dragging || dragOverlay ? "" : "opacity-50"
            }`}
            // className={classNames(
            //   styles.Item,
            //   dragging && styles.dragging,
            //   handle && styles.withHandle,
            //   dragOverlay && styles.dragOverlay,
            //   disabled && styles.disabled,
            //   color && styles.color
            // )}
            // style={style}
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">Daily Mix</p>
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">{value}</h4>
              {onRemove ? <Button onClick={onRemove}>remove</Button> : null}
              {handle ? (
                <Button {...handleProps} {...listeners}>
                  handle
                </Button>
              ) : null}
            </CardHeader>
          </Card>
        </li>
      );
    }
  )
);
