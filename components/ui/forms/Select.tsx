import * as Select from "@radix-ui/react-select";
import { DownChevron } from "../svgs/DownChevron";
import { UpChevron } from "../svgs/UpChevron";

export const SelectRoot = Select.Root;
export const SelectValue = Select.Value;

export const SelectTrigger: React.FC<
  React.ComponentProps<typeof Select.Trigger>
> = ({ children, className, ...props }) => {
  return (
    <Select.Trigger
      className={`flex h-10 w-full items-center justify-between rounded border border-input bg-background px-3 py-2 ${className}`}
      {...props}
    >
      {children}
      <Select.Icon asChild>
        <DownChevron />
      </Select.Icon>
    </Select.Trigger>
  );
};

export const SelectContent: React.FC<
  React.ComponentProps<typeof Select.Content>
> = ({ children, className, position = "popper", ...props }) => {
  return (
    <Select.Portal>
      <Select.Content
        className={`
          relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded border bg-card text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
          ${position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"}
          ${className}
        `}
        {...props}
      >
        <SelectScrollUpButton />
        <Select.Viewport
          className={`
            p-1
            ${position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"}
          `}
        >
          {children}
        </Select.Viewport>
        <SelectScrollDownButton />
      </Select.Content>
    </Select.Portal>
  );
};

export const SelectItem: React.FC<
  { ref?: React.Ref<HTMLDivElement>; value: string } & React.ComponentProps<
    typeof Select.Item
  >
> = ({ children, className, ...props }) => (
  <Select.Item
    className={`
      relative flex w-full cursor-default select-none items-center rounded py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50
      ${className}
    `}
    {...props}
  >
    <Select.ItemText>{children}</Select.ItemText>
  </Select.Item>
);

const SelectScrollUpButton: React.FC<
  React.ComponentProps<typeof Select.ScrollUpButton>
> = ({ className, ...props }) => (
  <Select.ScrollUpButton
    className={`flex cursor-default items-center justify-center py-1 ${className}`}
    {...props}
  >
    <UpChevron />
  </Select.ScrollUpButton>
);

const SelectScrollDownButton: React.FC<
  React.ComponentProps<typeof Select.ScrollDownButton>
> = ({ className, ...props }) => (
  <Select.ScrollDownButton
    className={`flex cursor-default items-center justify-center py-1 ${className}`}
    {...props}
  >
    <DownChevron />
  </Select.ScrollDownButton>
);
