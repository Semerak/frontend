import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  route('/', 'routes/protected-layout.tsx', [
    index('routes/home.tsx'),
    route('/logout', 'routes/logout.tsx'),
    route('/test', 'routes/test.tsx'),
  ]),
  route('/login', 'routes/login.tsx'),
] satisfies RouteConfig;
