import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  Outlet,
  Meta,
  Links,
  ScrollRestoration,
  Scripts,
  isRouteErrorResponse,
  useLocation,
} from 'react-router';

import { MainLayout } from './components/layouts/main-layout';
import { ConfigProvider } from './context/config-context';
import { SnackbarProvider } from './context/snackbar-context';
import LoadingScreen from './features/loading-screen/loading-screen';
import { AuthProvider } from './firebase/auth-provider';
import theme from './styles/theme';

import type { Route } from '.react-router/types/app/+types/root';

import './styles/app.css';

import './i18n';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
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
        {/* Maze Universal Snippet - Simplified for Query Parameter Approach */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function (m, a, z, e) {
                var s, t;
                try {
                  t = m.sessionStorage.getItem('maze-us');
                } catch (err) {}

                if (!t) {
                  t = new Date().getTime();
                  try {
                    m.sessionStorage.setItem('maze-us', t);
                  } catch (err) {}
                }

                s = a.createElement('script');
                s.src = z + '?apiKey=' + e;
                s.async = true;
                s.onload = function() {
                  console.log('Maze: Script loaded successfully');
                };
                s.onerror = function() {
                  console.error('Maze: Failed to load script');
                };
                a.getElementsByTagName('head')[0].appendChild(s);
                m.mazeUniversalSnippetApiKey = e;
              })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '32194307-52c3-448a-802e-54aa23884b05');
            `,
          }}
        />
      </head>
      <body className="min-h-screen relative">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// TODO: Add a better Loading Screen for the base app
export function HydrateFallback() {
  return <LoadingScreen />;
}

// Component to make SPA routes work with Maze by converting them to query parameters
function MazeRouteTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Convert React Router path to query parameter for Maze compatibility
    const convertRouteToQueryParam = () => {
      const currentPath = location.pathname;
      const currentSearch = location.search;
      const currentHash = location.hash;

      // Skip if we're already on the home page without parameters
      if (currentPath === '/' && !currentSearch && !currentHash) {
        console.log('Maze: On home page, no conversion needed');
        return;
      }

      // Create a new URL with the route as a query parameter
      const mazeCompatibleUrl = new URL(window.location.origin);

      // Convert path to a page parameter that Maze can track
      if (currentPath !== '/') {
        mazeCompatibleUrl.searchParams.set('page', currentPath.substring(1)); // Remove leading slash
      }

      // Preserve existing query parameters
      if (currentSearch) {
        const existingParams = new URLSearchParams(currentSearch);
        existingParams.forEach((value, key) => {
          mazeCompatibleUrl.searchParams.set(key, value);
        });
      }

      // Add hash if present
      if (currentHash) {
        mazeCompatibleUrl.hash = currentHash;
      }

      const newUrl = mazeCompatibleUrl.toString();

      // Only update if the URL is actually different
      if (newUrl !== window.location.href) {
        console.log(
          'Maze: Converting route',
          currentPath,
          'to query param URL:',
          newUrl,
        );

        // Update the browser URL without triggering React Router navigation
        window.history.replaceState(null, '', newUrl);

        // Force Maze to recognize this as a new page
        if (
          (window as any).maze &&
          typeof (window as any).maze.refresh === 'function'
        ) {
          setTimeout(() => {
            (window as any).maze.refresh();
            console.log('Maze: Refreshed after URL conversion');
          }, 100);
        }
      }
    };

    // Small delay to ensure the route change is complete
    setTimeout(convertRouteToQueryParam, 100);
  }, [location.pathname, location.search, location.hash]);

  return null;
}

export default function App() {
  const queryClient = new QueryClient();

  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ConfigProvider>
              <MainLayout>
                <MazeRouteTracker />
                <Outlet />
              </MainLayout>
            </ConfigProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
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
