import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ margin: '0 10px' }}>Home (Pública)</Link>
        <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
        <Link to="/dashboard" style={{ margin: '0 10px' }}>Dashboard (Protegida)</Link>
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Grupo de Rutas Protegidas (Usando ProtectedRoute como layout) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Puedes añadir más rutas protegidas aquí */}
          </Route>

          {/* Opcional: Manejo de 404 */}
          <Route path="*" element={<h1>404 - Ruta no encontrada</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;