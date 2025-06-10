import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { ModalEquipo } from "../components/ModalAgregarEquipo";

export default function Equipos() {
  const [equipos, setEquipos] = useState([]);  
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [modalEquipoAbierto, setModalEquipoAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-violet-700">Gestión de Equipos</h2>
          <p className="text-sm text-gray-500">Administra los equipos asignados y su estado dentro del hotel.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar equipo"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <button
            onClick={abrirModalAgregar}
            className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Agregar Equipo
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow rounded-lg mt-4">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-violet-500 text-white">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4 text-left">Nombre</th>
              <th className="py-2 px-4 text-left">Tipo</th>
              <th className="py-2 px-4 text-left">N° Serie</th>
              <th className="py-2 px-4 text-left">Estado</th>
              <th className="py-2 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {equiposFiltrados.map((equipo, index) => (
              <tr key={equipo.id} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{equipo.nombre}</td>
                <td className="py-2 px-4">{equipo.tipo}</td>
                <td className="py-2 px-4">{equipo.serie}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      equipo.activo
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
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
            {equiposFiltrados.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No hay equipos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de agregar y editar equipo */}
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

// Modal de eliminación
function ModalEliminar({ equipo, onCancelar, onConfirmar }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
      <div
        className={`bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full transform transition-all duration-300 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-xl font-semibold text-red-600 mb-4">¿Eliminar equipo?</h2>
        <p className="text-gray-700 mb-6">
          ¿Estás seguro que deseas eliminar <strong>{equipo.nombre}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancelar}
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
