import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ModalAgregarColaborador from "../components/modals/ModalAgregarColaborador";
import ModalVerColaborador from "../components/modals/ModalVerColaborador";
import ModalEditarColaborador from "../components/modals/ModalEditarColaborador";
import ModalConfirmarEliminacion from "../components/modals/ModalConfirmarEliminacion";

export default function Colaboradores() {
  const [busqueda, setBusqueda] = useState("");
  const [modalAgregarVisible, setModalAgregarVisible] = useState(false);
  const [modalVerVisible, setModalVerVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);
  const [listaColaboradores, setListaColaboradores] = useState([]);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [colaboradorAEliminar, setColaboradorAEliminar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;

  useEffect(() => {
    // Simulación de datos de colaboradores
    const datosSimulados = [
      {
      
        numero_colaborador: "C001",
        nombre_completo: "Ana Pérez",
        puesto: "Recepcionista",
        area: "Recepción",
        fecha_ingreso: "2024-03-01",
        estatus: "Activo",
        observacion: "Puntual y responsable"
      },
      {
      
        numero_colaborador: "C002",
        nombre_completo: "Luis Martínez",
        puesto: "Técnico de sistemas",
        area: "TI",
        fecha_ingreso: "2023-11-15",
        estatus: "Activo",
        observacion: "Encargado de equipos"
      },
      {
      
        numero_colaborador: "C003",
        nombre_completo: "María López",
        puesto: "Cocinera",
        area: "Cocina",
        fecha_ingreso: "2022-06-10",
        estatus: "Inactivo",
        observacion: "Baja temporal"
      }
    ];

    setListaColaboradores(datosSimulados);
  }, []);


  const colaboradoresFiltrados = listaColaboradores.filter((c) =>
    c.nombre_completo?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(colaboradoresFiltrados.length / registrosPorPagina);
  const inicio = (paginaActual - 1) * registrosPorPagina;
  const paginados = colaboradoresFiltrados.slice(inicio, inicio + registrosPorPagina);

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

  const handleEditarColaborador = (colab) => {
    setColaboradorSeleccionado(colab);
    setModalEditarVisible(true);
  };

  const handleGuardarEdicion = (colabActualizado) => {
    setListaColaboradores((prev) =>
      prev.map((colab) =>
        colab.id_colaborador === colabActualizado.id_colaborador ? colabActualizado : colab
      )
    );
    setModalEditarVisible(false);
    setColaboradorSeleccionado(null);
  };

  const confirmarEliminar = (colab) => {
    setColaboradorAEliminar(colab);
    setModalEliminarVisible(true);
  };

  const handleEliminarConfirmado = () => {
    setListaColaboradores((prev) =>
      prev.filter((colab) => colab.id_colaborador !== colaboradorAEliminar.id_colaborador)
    );
    setModalEliminarVisible(false);
    setColaboradorAEliminar(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 pt-2 pb-6">
      <div className="mb-1">

        <h2 className="text-2xl font-bold text-blue-900">Colaboradores</h2>
        <p className="text-gray-600 mb-4">
          Administra la información del personal y sus equipos asignados.
        </p>

        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative w-full sm:max-w-sm">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Buscar Colaboradores..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <button
              onClick={() => setModalAgregarVisible(true)}
              className="flex items-center bg-blue-900 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition ml-4"
            >
              <FaPlus />
              Agregar Colaborador
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Número</th>
              <th className="py-2 px-4 text-left">Nombre</th>
              <th className="py-2 px-4 text-left">Puesto</th>
              <th className="py-2 px-4 text-left">Área</th>
              <th className="py-2 px-4 text-left">Fecha Ingreso</th>
              <th className="py-2 px-4 text-left">Estatus</th>
              <th className="py-2 px-4 text-left">Observaciones</th>
              <th className="py-2 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginados.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No hay colaboradores registrados.
                </td>
              </tr>
            ) : (
              paginados.map((colab, index) => (
                <tr key={colab.id_colaborador} className="border-b hover:bg-blue-50 transition duration-200">
                  <td className="py-2 px-4">{colab.numero_colaborador}</td>
                  <td className="py-2 px-4">{colab.nombre_completo}</td>
                  <td className="py-2 px-4">{colab.puesto}</td>
                  <td className="py-2 px-4">{colab.area}</td>
                  <td className="py-2 px-4">
                    {colab.fecha_ingreso &&
                      new Date(colab.fecha_ingreso).toLocaleDateString("es-MX", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                  </td>
                  <td className="py-2 px-4">
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full
                ${colab.estatus === "Activo" ? "bg-green-100 text-green-800" :
                        colab.estatus === "Inactivo" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-200 text-gray-800"}`}>
                      {colab.estatus}
                    </span>
                  </td>
                  <td className="py-2 px-4">{colab.observacion}</td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => {
                          setColaboradorSeleccionado(colab);
                          setModalVerVisible(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => handleEditarColaborador(colab)}
                        className="text-yellow-500 hover:text-yellow-700"
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



      {renderPaginacion()}

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
