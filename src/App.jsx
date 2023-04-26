import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

function App() {
  return (
    <Theme preset={presetGpnDefault}>
      <BrowserRouter>
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:factory_id/:month" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  </Theme>
    
  );
}

export default App;
