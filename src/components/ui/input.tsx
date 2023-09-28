import * as React from "react";

import { cn } from "~/lib/utils";
import { useFormField } from "./form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, isError, ...props }, ref) => {
    const { error } = useFormField();
    return (
      <div
        className={cn(
          "flex h-12 items-center gap-3 rounded-md border border-[#D9D9D9] px-4 transition-colors duration-300 focus-within:border-[#633CFF] focus-within:shadow-custom",
          (error ?? isError) && "border-destructive",
          className,
        )}
      >
        {icon}
        <input
          type={type}
          className={cn(
            "flex w-full bg-background font-instrument text-[16px] font-normal leading-[24px] text-[#333333] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
