import { UniqueIdentifier } from "@dnd-kit/core";
import {
  AnimateLayoutChanges,
  useSortable,
  defaultAnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, forwardRef } from "react";
import { RemoveButton } from "../common/RemoveButton";
import { HandleButton } from "../common/HandleButton";

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

interface ContainerProps {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
  onRemove?(): void;
}
export const DroppableContainer = ({
  children,
  columns = 1,
  disabled,
  id,
  items,
  style,
  ...props
}: ContainerProps & {
  disabled?: boolean;
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
  style?: React.CSSProperties;
}) => {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data: {
      type: "container",
      children: items,
    },
    animateLayoutChanges,
  });

  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== "container") ||
      items.includes(over.id)
    : false;

  return (
    <Container
      ref={disabled ? undefined : setNodeRef}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
      }}
      hover={isOverContainer}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      columns={columns}
      {...props}
    >
      {children}
    </Container>
  );
};

export const Container = forwardRef<
  HTMLDivElement | HTMLButtonElement,
  ContainerProps
>(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: ContainerProps,
    ref
  ) => {
    const Component = onClick ? "button" : "div";

    return (
      <Component
        {...props}
        ref={ref as unknown as any}
        style={
          {
            ...style,
            gridAutoFlow: "column",
            "--columns": columns,
          } as React.CSSProperties
        }
        className={`flex flex-col gap-4 p-5 rounded-xl ${
          hover ? "bg-slate-50" : ""
        } ${
          placeholder
            ? "flex justify-center items-center w-[260px] h-[260px] border-dashed border"
            : ""
        }`}
        //   className={classNames(
        //     styles.Container,
        //     unstyled && styles.unstyled,
        //     horizontal && styles.horizontal,
        //     hover && styles.hover,
        //     placeholder && styles.placeholder,
        //     scrollable && styles.scrollable,
        //     shadow && styles.shadow
        //   )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div
            className={`flex justify-between sticky top-10 z-[100] bg-white p-4 rounded-xl `}
          >
            {label}
            <div className="flex gap-4">
              {onRemove ? <RemoveButton onClick={onRemove} /> : null}
              <HandleButton {...handleProps} />
            </div>
          </div>
        ) : null}
        {placeholder ? (
          children
        ) : (
          <ul className="flex flex-col gap-4">{children}</ul>
        )}
      </Component>
    );
  }
);

Container.displayName = "Container";
