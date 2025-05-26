import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/login', 'routes/login.tsx'),
  route('/logout', 'routes/logout.tsx'),
  route('test', 'routes/test.tsx'),
] satisfies RouteConfig;
