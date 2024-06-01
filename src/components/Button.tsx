import clsx from "clsx";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export const Button = ({
  children,
  border = true,
  ...props
}: PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & { border?: boolean }) => (
  <button
    className={clsx(
      "group flex flex-row gap-x-4 items-end rounded-lg",
      "px-5 py-4 transition-colors",
      "hover:bg-gray-100 hover:dark:bg-neutral-800/30",
      "active:bg-blue-100 active:dark:bg-blue-500/30",
      {
        "border border-gray-500 hover:border-gray-500 hover:dark:border-neutral-300":
          border,
      }
    )}
    {...props}
  >
    {children}
  </button>
);
