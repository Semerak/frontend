import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  route('/', 'routes/protected-layout.tsx', [
    index('routes/welcome.tsx'),
    route('/logout', 'routes/logout.tsx'),
    route('/test', 'routes/test.tsx'),
    route('/questionnaire', 'routes/questionnaire.tsx'),
    route('/results', 'routes/results.tsx'),
    route('/research', 'routes/research.tsx'),
    route('/bundle/:productId', 'routes/bundle.tsx'),
    route('/dev', 'routes/dev/layout.tsx', [
      index('routes/dev/home.tsx'),
      route('product-scanner', 'routes/dev/product-scanner.tsx'),
      route('system-status', 'routes/dev/system-status.tsx'),
      route('clients-db', 'routes/dev/clients-db.tsx'),
    ]),
  ]),
  route('/login', 'routes/login.tsx'),
] satisfies RouteConfig;
