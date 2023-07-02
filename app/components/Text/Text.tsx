import React, { useContext, forwardRef } from "react";
import styles from "./Text.css";
import type { LinksFunction } from "@remix-run/server-runtime";
import { useBoxContext } from "../Box/Box";
import { AcceptableContrastRatios } from "../__internal__/colorContrastUtils";
import type { ColorVariant } from "~/colors";

export interface TextProps {
  children: React.ReactNode;
  italic?: boolean;
  bold?: boolean;
  color?: ColorVariant | ColorVariant[];
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const TextContext = React.createContext(true);

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (props, ref): JSX.Element => {
    const { getContrastColor } = useBoxContext();
    const isTopLevel = useContext(TextContext);

    if (isTopLevel) {
      <TextContext.Provider value={false}>
        <p
          className="text-component"
          ref={ref}
          style={
            {
              "--text-contrast-color": `var(--color-${getContrastColor(
                ["gray-200", "gray-100"],
                AcceptableContrastRatios.TEXT
              )})`,
            } as React.CSSProperties
          }
        >
          <Text {...props}>{props.children}</Text>
        </p>
      </TextContext.Provider>;
    }

    if (props.italic) {
      const { italic: _removed, ...rest } = props;
      return (
        <em className="text-component-italic">
          <Text {...rest}>{props.children}</Text>
        </em>
      );
    }

    if (props.bold) {
      const { bold: _removed, ...rest } = props;
      return (
        <strong className="text-component-bold">
          <Text {...rest}>{props.children}</Text>
        </strong>
      );
    }

    if (props.color) {
      const { color, ...rest } = props;

      const desiredColors = Array.isArray(color) ? color : [color];

      return (
        <span
          className="text-component-color-span"
          style={
            {
              "--text-contrast-color": `var(--color-${getContrastColor(
                [...desiredColors, "gray-200", "gray-100"],
                AcceptableContrastRatios.TEXT
              )})`,
            } as React.CSSProperties
          }
        >
          <Text {...rest}>{props.children}</Text>
        </span>
      );
    }

    return <>{props.children}</>;
  }
);
Text.displayName = "Text";
