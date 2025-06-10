import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { ModalAcceso } from "../components/ModalAgregarAcceso"; 

const sistemasIniciales = [
];

// Modal que confirma eliminación
function ModalConfirmarEliminacion({ sistema, onCancelar, onConfirmar }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center">
        <h2 className="text-xl font-bold text-red-600 mb-3">¿Eliminar Acceso?</h2>
        <p className="text-gray-700 mb-4">
          ¿Estás seguro de que deseas eliminar el Sistema <strong>{sistema.nombre}</strong>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancelar}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Sistemas() {
  const [busqueda, setBusqueda] = useState("");
  const [sistemas, setSistemas] = useState(sistemasIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [sistemaEditando, setSistemaEditando] = useState(null);

  // Estados para Modal de Eliminación
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [sistemaAEliminar, setSistemaAEliminar] = useState(null);

  const abrirModalAgregar = () => {
    setSistemaEditando(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (sistema) => {
    setSistemaEditando(sistema);
    setModalAbierto(true);
  };

  const guardarSistema = (nuevoSistema) => {
    if (sistemaEditando) {
      setSistemas((prev) =>
        prev.map((s) =>
          s.id === sistemaEditando.id
            ? {
                ...s,
                nombre: nuevoSistema.nombre,
                descripcion: nuevoSistema.descripcion,
              }
            : s
        )
      );
    } else {
      const nuevo = {
        id: sistemas.length + 1,
        nombre: nuevoSistema.nombre,
        descripcion: nuevoSistema.descripcion,
        tipo: "Software", 
        activo: true,
      };
      setSistemas([...sistemas, nuevo]);
    }
  };

  //  se muestra modal de eliminación
  const confirmarEliminarSistema = (sistema) => {
    setSistemaAEliminar(sistema);
    setModalEliminarVisible(true);
  };

  // se elimina una vez confirmado
  const handleEliminarConfirmado = () => {
    setSistemas((prev) => prev.filter((s) => s.id !== sistemaAEliminar.id));
    setModalEliminarVisible(false);
    setSistemaAEliminar(null);
  };

  const sistemasFiltrados = sistemas.filter((s) =>
    s.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-violet-700 mb-1">
        Gestión de Sistemas y Accesos
      </h2>
      <p className="text-gray-600 mb-6">
        Administra los sistemas disponibles y controla sus accesos.
      </p>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center w-full max-w-sm">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Buscar sistema..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <button
          onClick={abrirModalAgregar}
          className="flex items-center bg-purple-700 text-white px-4 py-2 rounded-xl hover:bg-purple-800 transition ml-4"
        >
          <FaPlus className="mr-2" />
          Agregar Acceso
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-violet-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Sistema</th>
              <th className="py-2 px-4 text-left">Tipo</th>
              <th className="py-2 px-4 text-left">Descripción</th>
              <th className="py-2 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sistemasFiltrados.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="py-2 px-4">{s.nombre}</td>
                <td className="py-2 px-4">{s.tipo}</td>
                <td className="py-2 px-4">{s.descripcion}</td>
                <td className="py-2 px-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => abrirModalEditar(s)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => confirmarEliminarSistema(s)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {sistemasFiltrados.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No se encontraron sistemas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Agregar y editar */}
      <ModalAcceso
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSave={guardarSistema}
        acceso={sistemaEditando}
      />

      {/* Modal que confirma eliminación */}
      {modalEliminarVisible && sistemaAEliminar && (
        <ModalConfirmarEliminacion
          sistema={sistemaAEliminar}
          onCancelar={() => {
            setModalEliminarVisible(false);
            setSistemaAEliminar(null);
          }}
          onConfirmar={handleEliminarConfirmado}
        />
      )}
    </div>
  );
}
