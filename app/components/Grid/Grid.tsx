import type { LinksFunction } from "@remix-run/server-runtime";
import React from "react";
import styles from "./Grid.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

type ColumnsOption = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridItemProps {
  children: React.ReactNode;
  xxs?: ColumnsOption;
  xs?: ColumnsOption;
  s?: ColumnsOption;
  m?: ColumnsOption;
  l?: ColumnsOption;
  xl?: ColumnsOption;
  xxl?: ColumnsOption;
}

export interface GridProps {
  children: React.ReactNode;
  gutter?: boolean;
}

const GridItem = ({
  children,
  xxs = 12,
  xs = xxs,
  s = xs,
  m = s,
  l = m,
  xl = l,
  xxl = xl,
}: GridItemProps): JSX.Element => {
  return (
    <div
      className="grid-item-component"
      style={
        {
          "--grid-column-span-xxs": xxs,
          "--grid-column-span-xs": xs,
          "--grid-column-span-s": s,
          "--grid-column-span-m": m,
          "--grid-column-span-l": l,
          "--grid-column-span-xl": xl,
          "--grid-column-span-xxl": xxl,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export const Grid = ({ gutter, children }: GridProps): JSX.Element => {
  return (
    <div
      className="grid-component"
      style={{
        ...(gutter && { gap: `var(--space-4)` }),
      }}
    >
      {children}
    </div>
  );
};

Grid.Item = GridItem;
