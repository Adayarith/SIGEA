import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { ModalEquipo } from "../components/modals/ModalAgregarEquipo";

export default function Equipos() {
  const [equipos, setEquipos] = useState([]);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [modalEquipoAbierto, setModalEquipoAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;

  const abrirModalEliminar = (equipo) => {
    setEquipoSeleccionado(equipo);
    setMostrarModalEliminar(true);
  };

  const eliminarEquipo = () => {
    setEquipos(equipos.filter((e) => e.id !== equipoSeleccionado.id));
    setMostrarModalEliminar(false);
    setEquipoSeleccionado(null);
  };

  const cancelarEliminacion = () => {
    setMostrarModalEliminar(false);
    setEquipoSeleccionado(null);
  };

  const equiposFiltrados = equipos.filter((equipo) =>
    equipo.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirModalAgregar = () => {
    setModoEdicion(false);
    setEquipoSeleccionado(null);
    setModalEquipoAbierto(true);
  };

  const abrirModalEditar = (equipo) => {
    setModoEdicion(true);
    setEquipoSeleccionado(equipo);
    setModalEquipoAbierto(true);
  };

  const guardarEquipo = (equipoNuevo) => {
    if (modoEdicion && equipoSeleccionado) {
      setEquipos(equipos.map((eq) =>
        eq.id === equipoSeleccionado.id ? { ...equipoNuevo, id: eq.id } : eq
      ));
    } else {
      const nuevoId = equipos.length ? equipos[equipos.length - 1].id + 1 : 1;
      setEquipos([...equipos, { ...equipoNuevo, id: nuevoId }]);
    }
    setModalEquipoAbierto(false);
    setEquipoSeleccionado(null);
  };

  const totalPaginas = Math.ceil(equiposFiltrados.length / registrosPorPagina);
  const inicio = (paginaActual - 1) * registrosPorPagina;
  const paginados = equiposFiltrados.slice(inicio, inicio + registrosPorPagina);

  const renderPaginacion = () => {
    const elementos = [];
    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) elementos.push(i);
    } else {
      elementos.push(1);
      if (paginaActual > 4) elementos.push("...");
      const start = Math.max(2, paginaActual - 1);
      const end = Math.min(totalPaginas - 1, paginaActual + 1);
      for (let i = start; i <= end; i++) elementos.push(i);
      if (paginaActual < totalPaginas - 3) elementos.push("...");
      elementos.push(totalPaginas);
    }

    return (
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(1, prev - 1))}
          className="px-3 py-1 rounded-md text-sm bg-blue-800 text-white"
        >
          {"<"}
        </button>
        {elementos.map((el, idx) => (
          <button
            key={idx}
            onClick={() => typeof el === "number" && setPaginaActual(el)}
            disabled={el === "..."}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              paginaActual === el ? "bg-white text-blue-800 border border-blue-800" : "bg-blue-800 text-white"
            } ${el === "..." ? "cursor-default" : "cursor-pointer"}`}
          >
            {el}
          </button>
        ))}
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
      <h2 className="text-2xl font-bold text-blue-900 mb-1">Equipos</h2>
      <p className="text-gray-600 mb-6">
        Gestiona los equipos asignados y su estado dentro del hotel.
      </p>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center w-full max-w-sm">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Buscar equipo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
        </div>
        <button
          onClick={abrirModalAgregar}
          className="flex items-center bg-blue-900 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition ml-4"
        >
          <FaPlus className="mr-2" />
          Agregar Equipo
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white text-sm text-gray-700">
          <thead className="bg-blue-900 text-white">
            <tr>
                            <th className="py-2 px-4 text-left">Tipo de Equipo</th>
              <th className="py-2 px-4 text-left">Marca</th>
              <th className="py-2 px-4 text-left">Modelo</th>
              <th className="py-2 px-4 text-left">N/S</th>
              <th className="py-2 px-4 text-left">Estado</th>
                            <th className="py-2 px-4 text-left">Fecha de Entrga</th>

              <th className="py-2 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginados.map((equipo) => (
              <tr key={equipo.id} className="border-b hover:bg-blue-50 transition duration-200">
                <td className="py-2 px-4">{equipo.nombre}</td>
                <td className="py-2 px-4">{equipo.tipo}</td>
                <td className="py-2 px-4">{equipo.serie}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      equipo.activo
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {equipo.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="py-2 px-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => abrirModalEditar(equipo)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => abrirModalEliminar(equipo)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginados.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No hay equipos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {renderPaginacion()}

      {modalEquipoAbierto && (
        <ModalEquipo
          isOpen={modalEquipoAbierto}
          onClose={() => setModalEquipoAbierto(false)}
          onSave={guardarEquipo}
          equipo={modoEdicion ? equipoSeleccionado : null}
        />
      )}
    </div>
  );
}
