import React, { useState } from "react";

export default function ModalAgregarColaborador({ onClose, onSave, equiposDisponibles = [], sistemasDisponibles = [] }) {
  const [nombre, setNombre] = useState("");
  const [puesto, setPuesto] = useState("");
  const [equipoAsignado, setEquipoAsignado] = useState("");
  const [sistemasAsignados, setSistemasAsignados] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoColaborador = {
      id: Date.now(),
      nombre,
      correo,
      puesto,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold text-violet-700 mb-4">Agregar Colaborador</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control w-full mt-1"
              required
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">Puesto</label>
            <input
              type="text"
              value={puesto}
              onChange={(e) => setPuesto(e.target.value)}
              className="form-control w-full mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Equipo asignado</label>
            <select
              value={equipoAsignado}
              onChange={(e) => setEquipoAsignado(e.target.value)}
              className="form-control w-full mt-1"
            >
              <option value="">Seleccionar equipo</option>
              {equiposDisponibles.map((equipo, i) => (
                <option key={i} value={equipo}>
                  {equipo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sistemas asignados</label>
            <div className="grid grid-cols-2 gap-2">
              {sistemasDisponibles.map((sistema, i) => (
                <label key={i} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={sistemasAsignados.includes(sistema)}
                    onChange={() => toggleSistema(sistema)}
                    className="form-checkbox text-violet-700"
                  />
                  <span className="text-sm">{sistema}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-violet-700 text-white hover:bg-violet-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
