# Angular Tic Tac Toe (KAVIA)

This project replaces the previous React app with an Angular application while preserving the same Tic Tac Toe functionality and styling.

## Getting Started

- npm install
- npm start — runs Angular dev server on http://localhost:3000
- npm run build — builds the app to dist/tic-tac-toe
- npm test — runs unit tests with Karma/Jasmine

## Environment Variables

The following existing `.env` variables are mapped into Angular environment objects without requiring renaming:

- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_NEXT_TELEMETRY_DISABLED
- REACT_APP_ENABLE_SOURCE_MAPS
- REACT_APP_PORT
- REACT_APP_TRUST_PROXY
- REACT_APP_LOG_LEVEL
- REACT_APP_HEALTHCHECK_PATH
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

Access them in code via the imported `environment` object (e.g., `environment.API_BASE`).

## Notes

- Primary color: #3b82f6
- Accent/success: #06b6d4
- Responsive, centered grid with modern styling
