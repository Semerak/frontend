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
        {/* Maze Universal Snippet with SPA Configuration */}
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
                  
                  // Configure Maze for SPA behavior
                  setTimeout(function() {
                    if (m.maze) {
                      console.log('Maze: API available, configuring for SPA');
                      
                      // Set up SPA configuration if available
                      if (typeof m.maze.configure === 'function') {
                        m.maze.configure({
                          spa: true,
                          trackPageViews: true,
                          autoDetectPageChanges: true
                        });
                        console.log('Maze: Configured for SPA mode');
                      }
                      
                      // Override history methods to notify Maze of navigation
                      var originalPushState = history.pushState;
                      var originalReplaceState = history.replaceState;
                      
                      history.pushState = function() {
                        originalPushState.apply(history, arguments);
                        setTimeout(function() {
                          if (m.maze && typeof m.maze.refresh === 'function') {
                            m.maze.refresh();
                            console.log('Maze: Refreshed after pushState');
                          }
                        }, 100);
                      };
                      
                      history.replaceState = function() {
                        originalReplaceState.apply(history, arguments);
                        setTimeout(function() {
                          if (m.maze && typeof m.maze.refresh === 'function') {
                            m.maze.refresh();
                            console.log('Maze: Refreshed after replaceState');
                          }
                        }, 100);
                      };
                      
                      console.log('Maze: History methods patched for SPA tracking');
                      
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
        {/* Additional Maze SPA Integration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Ensure Maze can detect React elements after hydration
              window.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                  if (window.maze && typeof window.maze.refresh === 'function') {
                    console.log('Maze: Refreshing element detection after DOM ready');
                    window.maze.refresh();
                  }
                }, 2000);
              });
              
              // Additional SPA support - listen for React Router navigation
              window.addEventListener('popstate', function() {
                setTimeout(function() {
                  if (window.maze && typeof window.maze.refresh === 'function') {
                    console.log('Maze: Refreshing after popstate event');
                    window.maze.refresh();
                  }
                }, 100);
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
    if (typeof window === 'undefined') return;

    const notifyMazeOfPageChange = () => {
      const maze = (window as any).maze;

      if (!maze) {
        console.warn('Maze: API not available for route', location.pathname);
        return;
      }

      console.log('Maze: Notifying of route change to', location.pathname);
      // Update the URL in Maze's internal state
      const currentUrl = window.location.href;
      console.log('Maze: Current URL:', currentUrl);

      // Method 1: Force a document title change to trigger Maze's page detection
      const originalTitle = document.title;
      document.title = originalTitle + ' - ' + Date.now();
      setTimeout(() => {
        document.title = originalTitle;
      }, 100);

      // Method 2: Update window.location properties that Maze might read
      try {
        // Trigger Maze to re-read the URL by simulating navigation events
        const navigationEvent = new Event('maze-navigation', { bubbles: true });
        (navigationEvent as any).url = currentUrl;
        window.dispatchEvent(navigationEvent);
      } catch (e) {
        console.warn('Maze: Could not dispatch navigation event', e);
      }

      // Method 2: Call Maze tracking functions with explicit URL
      if (typeof maze.trackPageView === 'function') {
        try {
          maze.trackPageView(currentUrl);
          console.log('Maze: Called trackPageView() with URL');
        } catch (e) {
          console.warn('Maze: trackPageView failed', e);
        }
      }

      // Method 3: Force maze to reinitialize for the new page
      if (typeof maze.init === 'function') {
        try {
          maze.init();
          console.log('Maze: Called init() for new page');
        } catch (e) {
          console.warn('Maze: init failed', e);
        }
      }

      // Method 4: Update Maze configuration with new URL
      if (typeof maze.setConfig === 'function') {
        try {
          maze.setConfig({ url: currentUrl });
          console.log('Maze: Updated config with new URL');
        } catch (e) {
          console.warn('Maze: setConfig failed', e);
        }
      }

      // Method 5: Trigger a history change event (common for SPA tracking)
      try {
        const historyEvent = new PopStateEvent('popstate', { state: null });
        window.dispatchEvent(historyEvent);
        console.log('Maze: Dispatched popstate event');
      } catch (e) {
        console.warn('Maze: Could not dispatch popstate event', e);
      }

      // Method 6: Refresh Maze's element detection after DOM updates
      if (typeof maze.refresh === 'function') {
        // Multiple refresh attempts to ensure detection
        setTimeout(() => {
          maze.refresh();
          console.log('Maze: First refresh completed');
        }, 100);

        setTimeout(() => {
          maze.refresh();
          console.log('Maze: Second refresh completed');
        }, 500);

        setTimeout(() => {
          maze.refresh();
          console.log('Maze: Final refresh completed');
        }, 1000);
      }

      // Method 7: Restart Maze completely for the new page
      if (
        typeof maze.destroy === 'function' &&
        typeof maze.start === 'function'
      ) {
        try {
          setTimeout(() => {
            maze.destroy();
            maze.start();
            console.log('Maze: Restarted for new page');
          }, 200);
        } catch (e) {
          console.warn('Maze: Could not restart', e);
        }
      }
    };

    // Initial call
    setTimeout(notifyMazeOfPageChange, 100);

    // Additional calls to ensure Maze recognizes the change
    setTimeout(notifyMazeOfPageChange, 500);
    setTimeout(notifyMazeOfPageChange, 1000);
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
