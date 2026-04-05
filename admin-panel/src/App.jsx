import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Procurement from './pages/procurement/Procurement';
import Contracts from './pages/contracts/Contracts';
import Finance from './pages/finance/Finance';
import Suppliers from './pages/suppliers/Suppliers';
import Settings from './pages/settings/Settings';
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="procurement" element={<Procurement />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="finance" element={<Finance />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
