import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./Pages/Dashboard";
import Colaboradores from "./Pages/Colaboradores";
import Equipos from "./Pages/Equipos";
import Sistemas from "./Pages/Sistemas";
import Resguardos from "./Pages/Resguardos";
import AuthForm from "./components/AuthForm"; 

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/colaboradores" element={<Colaboradores />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/sistemas" element={<Sistemas />} />
        <Route path="/resguardos" element={<Resguardos />} />
      </Route>

      {/* Ruta pública: Login y Registro */}
      <Route path="/login" element={<AuthForm />} />
    </Routes>
  );
}
