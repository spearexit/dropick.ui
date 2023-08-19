import { UniqueIdentifier } from "@dnd-kit/core";
import {
  AnimateLayoutChanges,
  useSortable,
  defaultAnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, forwardRef } from "react";
import { Button } from "@nextui-org/react";
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
            "--columns": columns,
          } as React.CSSProperties
        }
        className={`flex flex-col gap-4 p-5 rounded-xl ${
          hover ? "bg-slate-50" : ""
        } ${
          placeholder ? "flex justify-center items-center w-[260px] border" : ""
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
          <div className={`flex justify-between`}>
            {label}
            <div className="flex gap-4">
              {onRemove ? (
                <button onClick={onRemove}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                  >
                    <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                  </svg>
                </button>
              ) : null}
              <button {...handleProps}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                >
                  <path d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z" />
                </svg>
              </button>
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
