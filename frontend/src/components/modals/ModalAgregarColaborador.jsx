import React, { useState } from "react";

export default function ModalAgregarColaborador({
  onClose,
  onSave,
  equiposDisponibles = [],
  sistemasDisponibles = [],
}) {
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  const [puesto, setPuesto] = useState("");
  const [area, setArea] = useState("");
  const [equipoAsignado, setEquipoAsignado] = useState("");
  const [sistemasAsignados, setSistemasAsignados] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoColaborador = {
      id: Date.now(),
      nombre,
      numero,
      puesto,
      area,
      equipo: equipoAsignado || "Sin asignar",
      sistemas: sistemasAsignados,
    };

    onSave(nuevoColaborador);
    onClose();
  };

  const toggleSistema = (sistema) => {
    setSistemasAsignados((prev) =>
      prev.includes(sistema)
        ? prev.filter((s) => s !== sistema)
        : [...prev, sistema]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 px-4 sm:px-0">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">
          Agregar Colaborador
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          {/* Número */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de Colaborador</label>
            <input
              type="number"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          {/* Puesto */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Puesto</label>
            <input
              type="text"
              value={puesto}
              onChange={(e) => setPuesto(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          {/* Área */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Área</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          {/* Equipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Equipo asignado</label>
            <select
              value={equipoAsignado}
              onChange={(e) => setEquipoAsignado(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="">Seleccionar equipo</option>
              {equiposDisponibles.map((equipo, i) => (
                <option key={i} value={equipo}>
                  {equipo}
                </option>
              ))}
            </select>
          </div>

          {/* Sistemas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sistemas asignados</label>
            <div className="grid grid-cols-2 gap-2">
              {sistemasDisponibles.map((sistema, i) => (
                <label key={i} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={sistemasAsignados.includes(sistema)}
                    onChange={() => toggleSistema(sistema)}
                    className="form-checkbox text-blue-900 focus:ring-blue-900"
                  />
                  <span className="text-sm">{sistema}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
