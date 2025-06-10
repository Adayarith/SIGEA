import React, { useState } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ModalAgregarColaborador from "../components/ModalAgregarColaborador";
import ModalVerColaborador from "../components/ModalVerColaborador";
import ModalEditarColaborador from "../components/ModalEditarColaborador";
import ModalConfirmarEliminacion from "../components/ModalConfirmarEliminacion";

export default function Colaboradores() {
  const [busqueda, setBusqueda] = useState("");
  const [modalAgregarVisible, setModalAgregarVisible] = useState(false);
  const [modalVerVisible, setModalVerVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);
  const [listaColaboradores, setListaColaboradores] = useState([]);

  const colaboradoresFiltrados = listaColaboradores.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEditarColaborador = (colab) => {
    setColaboradorSeleccionado(colab);
    setModalEditarVisible(true);
  };

  const handleGuardarEdicion = (datosEditados) => {
    const actualizados = listaColaboradores.map((c) =>
      c.id === datosEditados.id ? datosEditados : c
    );
    setListaColaboradores(actualizados);
    setModalEditarVisible(false);
    setColaboradorSeleccionado(null);
  };

  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [colaboradorAEliminar, setColaboradorAEliminar] = useState(null);

  const confirmarEliminar = (colab) => {
    setColaboradorAEliminar(colab);
    setModalEliminarVisible(true);
  };

  const handleEliminarConfirmado = (id) => {
    const actualizados = listaColaboradores.filter((c) => c.id !== id);
    setListaColaboradores(actualizados);
    setModalEliminarVisible(false);
    setColaboradorAEliminar(null);
  };

  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-violet-700">Colaboradores</h2>
          <p className="text-gray-500 text-sm">
            Administra la información del personal y sus equipos asignados
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar colaborador"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <button
            onClick={() => setModalAgregarVisible(true)}
            className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Agregar Colaborador
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-violet-500 text-white">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4 text-left">Nombre</th>
              <th className="py-2 px-4 text-left">Puesto</th>
              <th className="py-2 px-4 text-left">Área</th>
              <th className="py-2 px-4 text-left">Fecha de Ingreso</th>
              <th className="py-2 px-4 text-left">Estado</th>
              <th className="py-2 px-4 text-left">Observación</th>
              <th className="py-2 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {colaboradoresFiltrados.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No hay colaboradores registrados.
                </td>
              </tr>
            ) : (
              colaboradoresFiltrados.map((colab, index) => (
                <tr key={colab.id} className="border-b">
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4">{colab.nombre}</td>
                  <td className="py-2 px-4">{colab.puesto}</td>
                  <td className="py-2 px-4">{colab.area}</td>
                  <td className="py-2 px-4">
                    {new Date(colab.ingreso).toLocaleDateString("es-MX", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    })}
                  </td>
                  <td className="py-2 px-4">{colab.estado}</td>
                  <td className="py-2 px-4">{colab.observacion}</td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => {
                          setColaboradorSeleccionado(colab);
                          setModalVerVisible(true);
                        }}
                        className="text-violet-600 hover:underline"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => handleEditarColaborador(colab)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => confirmarEliminar(colab)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modales */}
      {modalAgregarVisible && (
        <ModalAgregarColaborador onClose={() => setModalAgregarVisible(false)} />
      )}

      {modalVerVisible && colaboradorSeleccionado && (
        <ModalVerColaborador
          colaborador={colaboradorSeleccionado}
          onClose={() => {
            setColaboradorSeleccionado(null);
            setModalVerVisible(false);
          }}
        />
      )}

      {modalEditarVisible && colaboradorSeleccionado && (
        <ModalEditarColaborador
          colaborador={colaboradorSeleccionado}
          onClose={() => {
            setModalEditarVisible(false);
            setColaboradorSeleccionado(null);
          }}
          onGuardar={handleGuardarEdicion}
        />
      )}

      {modalEliminarVisible && colaboradorAEliminar && (
        <ModalConfirmarEliminacion
          colaborador={colaboradorAEliminar}
          onCancelar={() => {
            setModalEliminarVisible(false);
            setColaboradorAEliminar(null);
          }}
          onConfirmar={handleEliminarConfirmado}
        />
      )}
    </div>
  );
}
