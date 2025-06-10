import { useState } from "react";

export default function Dashboard() {
  // Estado con historial ejemplo
  const [historial, setHistorial] = useState([
   // { fecha: "2025-06-07", usuario: "Luis Diaz", accion: "Edición", detalle: "Actualizó equipo HP para María." },
    // { fecha: "2025-06-06", usuario: "Luis Diaz", accion: "Asignación", detalle: "Asignó sistema SIGE a Luis." },
    //{ fecha: "2025-06-05", usuario: "Jose Luis", accion: "Resguardo", detalle: "Generó resguardo para laptop Dell." },
  ]);

  return (
    <div className="p-6 md:p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-violet-700 mb-6">Bienvenido</h1>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card title="Colaboradores" description="23 activos actualmente" />
        <Card title="Equipos Asignados" description="15 asignados, 5 disponibles" />
        <Card title="Sistemas/Accesos" description="7 sistemas administrados" />
        <Card title="Resguardos" description="150 repositorios" />
      </div>

      {/* Historial de actividad */}
      <section>
        <h2 className="text-2xl font-semibold text-violet-700 mb-4">Historial de actividad</h2>
        <div className="bg-white shadow rounded-2xl overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-violet-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-left">Usuario</th>
                <th className="px-6 py-3 text-left">Acción</th>
                <th className="px-6 py-3 text-left">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {historial.length > 0 ? (
                historial.map(({ fecha, usuario, accion, detalle }, i) => (
                  <Fila
                    key={i}
                    fecha={fecha}
                    usuario={usuario}
                    accion={accion}
                    detalle={detalle}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-700"
                  >
                    No se encontraron registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Card({ title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-semibold text-violet-700 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Fila({ fecha, usuario, accion, detalle }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{fecha}</td>
      <td className="px-6 py-4 whitespace-nowrap">{usuario}</td>
      <td className="px-6 py-4 whitespace-nowrap">{accion}</td>
      <td className="px-6 py-4">{detalle}</td>
    </tr>
  );
}
