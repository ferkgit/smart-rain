import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SettingsIntegrations from './routes/SettingsIntegrations';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/settings/integrations" element={<SettingsIntegrations />} />
      </Routes>
    </Router>
  );
}
