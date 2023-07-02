import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import resetStylesheet from "./reset.css";
import themeStylesheet from "./theme.css";
import { Box, componentLibraryLinks } from "./components";

import { getUser } from "~/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: resetStylesheet },
  { rel: "stylesheet", href: themeStylesheet },
  ...componentLibraryLinks(),
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Box bg="gray-100">
          <div style={{ minHeight: "100vh" }}>
            <Outlet />
          </div>
        </Box>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
