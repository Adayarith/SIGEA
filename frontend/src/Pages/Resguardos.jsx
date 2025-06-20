import {
  FaFilePdf,
  FaTrash,
  FaPlus,
  FaSignature,
  FaClipboardList,
  FaSearch,
} from "react-icons/fa";
import { useState } from "react";
import ModalGenerarResguardo from "../components/modals/ModalGenerarResguardo"; // ajusta la ruta si está en otro lugar

const resguardosIniciales = [
  {
    id: 1,
    colaborador: "Ana Lucia",
    equipos: ["Laptop HP", "Mouse Logitech"],
    accesos: ["Correo Corporativo", "Sistema ABRHIL"],
    fecha: "2025-06-01",
    firmado: true,
  },
  {
    id: 2,
    colaborador: "Luis Diaz",
    equipos: ["Laptop Dell"],
    accesos: ["Correo Corporativo"],
    fecha: "2025-06-05",
    firmado: false,
  },
];

export default function Resguardos() {
  const [busqueda, setBusqueda] = useState("");
  const [resguardos, setResguardos] = useState(resguardosIniciales);
  const [paginaActual, setPaginaActual] = useState(1);
  const [modalResguardoVisible, setModalResguardoVisible] = useState(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);
  const registrosPorPagina = 10;

  const resguardosFiltrados = resguardos.filter((r) =>
    r.colaborador.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(resguardosFiltrados.length / registrosPorPagina);
  const inicio = (paginaActual - 1) * registrosPorPagina;
  const paginados = resguardosFiltrados.slice(inicio, inicio + registrosPorPagina);

  const renderPaginacion = () => {
    const elementos = [];
    for (let i = 1; i <= totalPaginas; i++) {
      elementos.push(
        <button
          key={i}
          onClick={() => setPaginaActual(i)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${paginaActual === i
            ? "bg-white text-blue-800 border border-blue-800"
            : "bg-blue-800 text-white"
            }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(1, prev - 1))}
          className="px-3 py-1 rounded-md text-sm bg-blue-800 text-white"
        >
          {"<"}
        </button>
        {elementos}
        <button
          onClick={() => setPaginaActual((prev) => Math.min(totalPaginas, prev + 1))}
          className="px-3 py-1 rounded-md text-sm bg-blue-800 text-white"
        >
          {">"}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 pt-2 pb-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-1">Resguardos</h2>
      <p className="text-gray-600 mb-6">
        Genera, visualiza y gestiona los resguardos de entrega de equipos y accesos.
      </p>

      {/* Buscador y botón */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="relative w-full max-w-sm">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Buscar colaborador..."
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 text-sm"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <button
          className="flex items-center bg-blue-900 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition"
          onClick={() => {
            setColaboradorSeleccionado({
              nombre: "Carlos Martínez",
              correo: "c.martinez@dreamsresorts.com",
            });
            setModalResguardoVisible(true);
          }}
        >
          <FaPlus className="mr-2" />
          Generar Resguardo
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Colaborador</th>
              <th className="py-2 px-4 text-left">Equipo</th>
              <th className="py-2 px-4 text-left">Accesos</th>
              <th className="py-2 px-4 text-center">Fecha</th>
              <th className="py-2 px-4 text-center">Estado</th>
              <th className="py-2 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginados.length > 0 ? (
              paginados.map((r) => (
                <tr key={r.id} className="border-b hover:bg-blue-50 transition duration-200">
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
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${r.firmado ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {r.firmado ? "Firmado" : "Pendiente"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
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
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No se encontraron resguardos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {renderPaginacion()}

      {/* Modal */}
      {modalResguardoVisible && (
        <ModalGenerarResguardo
          colaborador={colaboradorSeleccionado}
          onClose={() => setModalResguardoVisible(false)}
        />
      )}
    </div>
  );
}
