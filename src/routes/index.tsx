/**
 * Copyright (c) 2025 XUNOIA TECHNOLOGIES PRIVATE LIMITED
 * Licensed under XUNOIA Private License v1.0
 * All rights reserved.
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes, defaultRoute } from './routes';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">loading...</div>
  </div>
);

const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {routes.map(({ path, element: Element, title }) => (
          <Route 
            key={path} 
            path={path} 
            element={<Element />} 
          />
        ))}
        
        {/* default route */}
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        
        <Route path="*" element={<Navigate to={defaultRoute} replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRoutes;