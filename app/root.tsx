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
        {/* Maze Universal Snippet */}
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
                  // Give Maze a moment to initialize
                  setTimeout(function() {
                    if (m.maze) {
                      console.log('Maze: API available');
                    } else {
                      console.warn('Maze: API not available after script load');
                    }
                  }, 500);
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
        {/* Additional Maze Configuration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Ensure Maze can detect React elements
              window.addEventListener('DOMContentLoaded', function() {
                // Force Maze to rescan after React hydration
                setTimeout(function() {
                  if (window.maze && typeof window.maze.refresh === 'function') {
                    console.log('Maze: Refreshing element detection');
                    window.maze.refresh();
                  }
                }, 2000);
              });
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

// Component to track route changes for Maze
function MazeRouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // Wait for Maze to be fully loaded before tracking
    const trackPageView = () => {
      if (typeof window !== 'undefined') {
        const maze = (window as any).maze;
        if (maze && typeof maze.trackPageView === 'function') {
          console.log('Maze: Tracking page view for', location.pathname);
          maze.trackPageView();
        } else {
          // Retry after a short delay if Maze isn't ready yet
          setTimeout(trackPageView, 100);
        }
      }
    };

    // Small delay to ensure Maze is initialized
    setTimeout(trackPageView, 300);
  }, [location.pathname]);

  // Also ensure Maze detects the initial page load
  useEffect(() => {
    const initMazeTracking = () => {
      if (typeof window !== 'undefined') {
        const maze = (window as any).maze;
        if (maze) {
          console.log('Maze: Initialized and ready');
          // Force Maze to scan for interactive elements
          if (typeof maze.refresh === 'function') {
            maze.refresh();
          }
        } else {
          // Keep checking until Maze is available
          setTimeout(initMazeTracking, 500);
        }
      }
    };

    // Wait a bit longer for initial setup
    setTimeout(initMazeTracking, 1000);
  }, []);

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
