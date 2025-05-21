import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import "./i18n";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen relative">
        {children}
        <ScrollRestoration />
        <Scripts />

        <div className="absolute top-4 left-4 z-10 w-18">
          <FormControl fullWidth>
            <InputLabel id="lang-select-label">Language</InputLabel>
            <Select
              labelId="lang-select-label"
              id="lang-select"
              value="EN"
              label="Language"
              variant="outlined"
              // onChange={handleChange}
            >
              <MenuItem value="EN">EN</MenuItem>
              <MenuItem value="DE">DE</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
          <img
            src="/beutechful-logo.png"
            alt="Beutechful Logo"
            className="w-1/3"
          />
        </div>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
