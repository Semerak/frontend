import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  route('/', 'routes/protected-layout.tsx', [
    index('routes/welcome.tsx'),
    route('/logout', 'routes/logout.tsx'),
    route('/test', 'routes/test.tsx'),
    route('/questionnaire', 'routes/questionnaire.tsx'),
    route('/results', 'routes/results.tsx'),
    route('/research', 'routes/research.tsx'),
  ]),
  route('/login', 'routes/login.tsx'),
] satisfies RouteConfig;
