import {
  FaFilePdf,
  FaTrash,
  FaPlus,
  FaSignature,
  FaClipboardList,
  FaSearch,
} from "react-icons/fa";
import { useState } from "react";

// ejemplos de resguardos iniciales 
const resguardosIniciales = [
  // {
  //   id: 1,
  //   colaborador: "Ana Pérez",
  //   equipos: ["Laptop HP", "Mouse Logitech"],
  //   accesos: ["Correo Corporativo", "Sistema de Reservas"],
  //   fecha: "2025-06-01",
  //   firmado: true,
  // },
  // {
  //   id: 2,
  //   colaborador: "Luis Mendoza",
  //   equipos: ["Laptop Lenovo"],
  //   accesos: ["Correo Corporativo"],
  //   fecha: "2025-06-05",
  //   firmado: false,
  // },
];

export default function Resguardos() {
  const [busqueda, setBusqueda] = useState("");
  const [resguardos, setResguardos] = useState(resguardosIniciales);

  const resguardosFiltrados = resguardos.filter((r) =>
    r.colaborador.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Título y botón */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
          <h2 className="text-2xl font-bold text-violet-700">Resguardos</h2>
        </h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Buscar colaborador..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <button className="flex items-center bg-purple-700 text-white px-4 py-2 rounded-xl hover:bg-purple-800 transition">
            <FaPlus className="mr-2" />
            Generar Resguardo
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow rounded-2xl bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-violet-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Colaborador</th>
              <th className="px-4 py-3 text-left">Equipo(s)</th>
              <th className="px-4 py-3 text-left">Accesos</th>
              <th className="px-4 py-3 text-center">Fecha</th>
              <th className="px-4 py-3 text-center">Estado</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {resguardosFiltrados.length > 0 ? (
              resguardosFiltrados.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-2">{r.colaborador}</td>
                  <td className="px-4 py-2">
                    {r.equipos.map((e, i) => (
                      <div key={i}>{e}</div>
                    ))}
                  </td>
                  <td className="px-4 py-2">
                    {r.accesos.map((a, i) => (
                      <div key={i}>{a}</div>
                    ))}
                  </td>
                  <td className="px-4 py-2 text-center">{r.fecha}</td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs ${
                        r.firmado ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    >
                      {r.firmado ? "Firmado" : "Pendiente"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center gap-3">
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Eliminar"
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Ver PDF"
                      >
                        <FaFilePdf />
                      </button>
                      {!r.firmado && (
                        <button
                          className="text-green-600 hover:text-green-800"
                          title="Firmar"
                        >
                          <FaSignature />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No se encontraron resguardos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
