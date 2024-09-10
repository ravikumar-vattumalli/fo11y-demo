import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { matchRoutes, useLocation, createRoutesFromChildren, Routes, useNavigationType } from 'react-router-dom';
import { initializeFaro, ReactIntegration, getWebInstrumentations, ReactRouterVersion } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';


const root = ReactDOM.createRoot(document.getElementById('root'));

initializeFaro({
  url: '',
  app: {
    name: 'fo11y-demo',
    version: '1.0.0',
    environment: 'production'
  },
  
  instrumentations: [
    // Mandatory, omits default instrumentations otherwise.
    ...getWebInstrumentations(),

    // Tracing package to get end-to-end visibility for HTTP requests.
    new TracingInstrumentation(),

    // React integration for React applications.
    new ReactIntegration({
      router: {
        version: ReactRouterVersion.V6,
        dependencies: {
          createRoutesFromChildren,
          matchRoutes,
          Routes,
          useLocation,
          useNavigationType
        }
      },
    }),
  ],
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);