import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/welcome.tsx'),
  route('/questionnaire', 'routes/questionnaire.tsx'),
  route('test', 'routes/test.tsx'),
] satisfies RouteConfig;
