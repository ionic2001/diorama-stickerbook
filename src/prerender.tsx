import React from 'react';
import { renderToString } from 'react-dom/server';
import ServiceApp from './ServiceApp';
export { pageMeta, pagePath, parsePath, publicPages, utilityPages } from './pageContent';
export function render(path: string) { return renderToString(<ServiceApp initialPath={path} />); }
