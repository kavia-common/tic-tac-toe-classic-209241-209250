declare global {
  interface Window { __env?: Record<string, string | undefined>; }
}

const e = (typeof window !== 'undefined' && window.__env) ? window.__env : {};

export const environment = {
  /** PUBLIC_INTERFACE
   * Angular environment mapped from existing REACT_APP_* vars via window.__env.
   * This avoids relying on Node's process.env and works in browser builds.
   */
  production: false,
  API_BASE: e.REACT_APP_API_BASE ?? '',
  BACKEND_URL: e.REACT_APP_BACKEND_URL ?? '',
  FRONTEND_URL: e.REACT_APP_FRONTEND_URL ?? '',
  WS_URL: e.REACT_APP_WS_URL ?? '',
  NODE_ENV: e.REACT_APP_NODE_ENV ?? 'development',
  NEXT_TELEMETRY_DISABLED: e.REACT_APP_NEXT_TELEMETRY_DISABLED ?? '1',
  ENABLE_SOURCE_MAPS: e.REACT_APP_ENABLE_SOURCE_MAPS ?? 'true',
  PORT: e.REACT_APP_PORT ?? '3000',
  TRUST_PROXY: e.REACT_APP_TRUST_PROXY ?? '0',
  LOG_LEVEL: e.REACT_APP_LOG_LEVEL ?? 'info',
  HEALTHCHECK_PATH: e.REACT_APP_HEALTHCHECK_PATH ?? '/health',
  FEATURE_FLAGS: e.REACT_APP_FEATURE_FLAGS ?? '',
  EXPERIMENTS_ENABLED: e.REACT_APP_EXPERIMENTS_ENABLED ?? 'false'
};
