import React, { createContext, useContext } from "react";
import type { ColorVariant } from "~/colors";
import type { ContrastRatios } from "../__internal__/colorContrastUtils";
import type { LinksFunction } from "@remix-run/server-runtime";
import {
  AcceptableContrastRatios,
  getContrastColor,
} from "../__internal__/colorContrastUtils";
import styles from "./Box.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export type SpaceOption =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;

export type BorderRadiusOption = 0 | 1 | 2 | 3 | 4 | "full";

export interface InternalBoxProps {
  children: React.ReactNode;
  p?: SpaceOption;
  py?: SpaceOption;
  pt?: SpaceOption;
  pb?: SpaceOption;
  px?: SpaceOption;
  pl?: SpaceOption;
  pr?: SpaceOption;

  m?: SpaceOption;
  my?: SpaceOption;
  mt?: SpaceOption;
  mb?: SpaceOption;
  mx?: SpaceOption;
  ml?: SpaceOption;
  mr?: SpaceOption;

  borderRadius?: BorderRadiusOption;

  className?: string;
  style?: React.CSSProperties;

  bg?: ColorVariant;
}

const wrappedGetColor =
  (backgroundColor: ColorVariant) =>
  (
    desiredForegroundColor: ColorVariant | ColorVariant[],
    minimumContrastRatio: ContrastRatios
  ): ReturnType<typeof getContrastColor> =>
    getContrastColor(
      backgroundColor,
      desiredForegroundColor,
      minimumContrastRatio
    );

export const InternalBox = ({
  children,
  p = 0,
  px = p,
  py = p,
  pl = px,
  pr = px,
  pt = py,
  pb = py,
  m = 0,
  mx = m,
  my = m,
  ml = mx,
  mr = mx,
  mt = my,
  mb = my,
  bg = undefined,
  borderRadius,
  className,
  style,
  ...rest
}: InternalBoxProps): JSX.Element => {
  return (
    <div
      className={`box-component${className ? ` ${className}` : ""}`}
      style={
        {
          ...style,
          ...(pt && { paddingBlockStart: `var(--space-${pt})` }),
          ...(pb && { paddingBlockEnd: `var(--space-${pb})` }),
          ...(pl && { paddingInlineStart: `var(--space-${pl})` }),
          ...(pr && { paddingInlineEnd: `var(--space-${pr})` }),
          ...(mt && { marginBlockStart: `var(--space-${mt})` }),
          ...(mb && { marginBlockEnd: `var(--space-${mb})` }),
          ...(ml && { marginInlineStart: `var(--space-${ml})` }),
          ...(mr && { marginInlineEnd: `var(--space-${mr})` }),
          ...(bg && {
            backgroundColor: `var(--color-${bg})`,
            color: `var(--color-${getContrastColor(
              bg,
              "gray-800",
              AcceptableContrastRatios.TEXT
            )})`,
          }),
          ...(borderRadius && {
            borderRadius: `var(--border-radius-${borderRadius})`,
          }),
        } as React.CSSProperties
      }
      {...rest}
    >
      {bg ? (
        <BoxContext.Provider
          value={{
            backgroundColor: bg,
            getContrastColor: wrappedGetColor(bg),
          }}
        >
          {children}
        </BoxContext.Provider>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export interface BoxProps
  extends Omit<InternalBoxProps, "className" | "style"> {}

interface BoxContextShape {
  backgroundColor: ColorVariant;
  getContrastColor: ReturnType<typeof wrappedGetColor>;
}

const BoxContext = createContext<BoxContextShape>({
  backgroundColor: "white",
  getContrastColor: wrappedGetColor("white"),
});

export const useBoxContext = (): BoxContextShape => useContext(BoxContext);

export const Box = (props: BoxProps): JSX.Element => {
  return <InternalBox {...props} />;
};
