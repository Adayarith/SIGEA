import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { ModalAcceso } from "../components/modals/ModalAgregarAcceso";

const sistemasIniciales = [];

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
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [sistemaAEliminar, setSistemaAEliminar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;

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
    setModalAbierto(false);
  };

  const confirmarEliminarSistema = (sistema) => {
    setSistemaAEliminar(sistema);
    setModalEliminarVisible(true);
  };

  const handleEliminarConfirmado = () => {
    setSistemas((prev) => prev.filter((s) => s.id !== sistemaAEliminar.id));
    setModalEliminarVisible(false);
    setSistemaAEliminar(null);
  };

  const sistemasFiltrados = sistemas.filter((s) =>
    s.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(sistemasFiltrados.length / registrosPorPagina);
  const inicio = (paginaActual - 1) * registrosPorPagina;
  const paginados = sistemasFiltrados.slice(inicio, inicio + registrosPorPagina);

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
          {'<'}
        </button>
        {elementos.map((el, idx) => (
          <button
            key={idx}
            onClick={() => typeof el === "number" && setPaginaActual(el)}
            disabled={el === "..."}
            className={`px-3 py-1 rounded-md text-sm font-medium ${paginaActual === el ? "bg-white text-blue-800 border border-blue-800" : "bg-blue-800 text-white"
              } ${el === "..." ? "cursor-default" : "cursor-pointer"}`}
          >
            {el}
          </button>
        ))}
        <button
          onClick={() => setPaginaActual((prev) => Math.min(totalPaginas, prev + 1))}
          className="px-3 py-1 rounded-md text-sm bg-blue-800 text-white"
        >
          {'>'}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 pt-2 pb-6">      <h2 className="text-2xl font-bold text-blue-900 mb-1">
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
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
        </div>
        <button
          onClick={abrirModalAgregar}
          className="flex items-center bg-blue-900 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition ml-4"
        >
          <FaPlus className="mr-2" />
          Agregar Sistema
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
  <table className="min-w-full bg-white text-sm text-gray-700">
    <thead className="bg-blue-900 text-white">
      <tr>
        <th className="py-2 px-4 text-left">Sistema</th>
        <th className="py-2 px-4 text-left">Tipo</th>
        <th className="py-2 px-4 text-left">Descripción</th>
        <th className="py-2 px-4 text-left">Estado</th>
        <th className="py-2 px-4 text-center">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {paginados.map((s) => (
        <tr key={s.id} className="border-b hover:bg-blue-50 transition duration-200">
          <td className="py-2 px-4">{s.nombre}</td>
          <td className="py-2 px-4">{s.tipo}</td>
          <td className="py-2 px-4">{s.descripcion}</td>
          <td className="py-2 px-4">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              s.activo ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}>
              {s.activo ? "Activo" : "Inactivo"}
            </span>
          </td>
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
      {paginados.length === 0 && (
        <tr>
          <td colSpan="5" className="text-center py-4 text-gray-500">
            No se encontraron sistemas.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      {renderPaginacion()}

      <ModalAcceso
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSave={guardarSistema}
        acceso={sistemaEditando}
      />

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
