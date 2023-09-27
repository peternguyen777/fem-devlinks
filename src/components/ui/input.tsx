import * as React from "react";

import { cn } from "~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "focus-within:shadow-custom  box-content flex h-12 gap-3 rounded-md border border-[#D9D9D9] px-4 transition-colors duration-100 focus-within:border-[#633CFF]",
          className,
        )}
      >
        {icon}
        <input
          type={type}
          className={cn(
            "bg-background font-instrument flex w-full text-[16px] font-normal leading-[24px] text-[#333333] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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
