import React from "react";
import styles from "./Button.css";
import type { LinksFunction } from "@remix-run/server-runtime";

export interface ButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "type"
  > {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const Button = React.forwardRef(
  (
    { children, onClick, variant = "primary", ...rest }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ): JSX.Element => {
    return (
      <button
        {...rest}
        ref={ref}
        className={`button btn-${variant}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
