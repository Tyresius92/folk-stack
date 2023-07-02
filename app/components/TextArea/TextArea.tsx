import React, { useId } from "react";
import { useBoxContext } from "../Box/Box";
import { AcceptableContrastRatios } from "../__internal__/colorContrastUtils";
import type { LinksFunction } from "@remix-run/node";
import styles from "./TextArea.css";

export interface TextAreaProps
  extends Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> {
  label: string;
  hiddenLabel?: boolean;
  name: string;

  errorMessage?: string;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const TextArea = ({
  label,
  hiddenLabel,
  errorMessage,
  ...rest
}: TextAreaProps): JSX.Element => {
  const inputId = useId();
  const errorId = useId();
  const { getContrastColor } = useBoxContext();

  return (
    <div className="text-area-wrapper">
      <label
        htmlFor={inputId}
        className={`text-area-label ${hiddenLabel ? ".visually-hidden" : ""}`}
        style={
          {
            "--text-area-contrast-color": `var(--color-${getContrastColor(
              ["gray-200", "gray-100"],
              AcceptableContrastRatios.TEXT
            )})`,
          } as React.CSSProperties
        }
      >
        <span>{label}</span>
      </label>
      <textarea
        id={inputId}
        aria-describedby={errorId}
        aria-invalid={errorMessage ? true : undefined}
        className="text-area-input"
        // using spread here to get value and onchange for free
        {...rest}
      />
      {errorMessage && (
        <div id={errorId} className="text-area-error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
