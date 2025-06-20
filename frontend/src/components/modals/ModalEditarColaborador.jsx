import React, { useState, useEffect } from "react";

export default function ModalEditarColaborador({
  colaborador,
  onClose,
  onGuardar,
  equiposDisponibles = [],
  sistemasDisponibles = [],
}) {
  const [form, setForm] = useState({
    id: colaborador.id,
    nombre: colaborador.nombre || "",
    numero: colaborador.numero || "",
    puesto: colaborador.puesto || "",
    area: colaborador.area || "",
    ingreso: colaborador.ingreso || "",
    estado: colaborador.estado || "Activo",
    observacion: colaborador.observacion || "",
    equipo: colaborador.equipo || "",
    sistemas: colaborador.sistemas || [],
  });

  const toggleSistema = (sistema) => {
    setForm((prev) => ({
      ...prev,
      sistemas: prev.sistemas.includes(sistema)
        ? prev.sistemas.filter((s) => s !== sistema)
        : [...prev.sistemas, sistema],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    onGuardar(form);
  };

  const handleToggleEstado = () => {
    setForm((prev) => ({
      ...prev,
      estado: prev.estado === "Activo" ? "Inactivo" : "Activo",
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 px-4 sm:px-0">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">
          Editar Colaborador
        </h3>

        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="number"
              name="numero"
              placeholder="Número"
              value={form.numero}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              name="puesto"
              placeholder="Puesto"
              value={form.puesto}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              name="area"
              placeholder="Área"
              value={form.area}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="date"
              name="ingreso"
              value={form.ingreso}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />

            <div className="flex items-center gap-2">
              <label className="text-sm">Estado:</label>
              <div
                className={`relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in`}
              >
                <input
                  type="checkbox"
                  name="estado"
                  checked={form.estado === "Activo"}
                  onChange={handleToggleEstado}
                  className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 transform-gpu checked:translate-x-full"
                  style={{
                    top: "2px",
                    left: "2px",
                  }}
                />
                <span
                  className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${
                    form.estado === "Activo" ? "bg-green-400" : "bg-red-400"
                  }`}
                ></span>
              </div>
              <span className="text-sm">
                {form.estado === "Activo" ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          <textarea
            name="observacion"
            placeholder="Observación"
            value={form.observacion}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <div>
            <label className="block text-sm font-medium mb-1">Equipo asignado</label>
            <select
              name="equipo"
              value={form.equipo}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Seleccionar equipo</option>
              {equiposDisponibles.map((eq, i) => (
                <option key={i} value={eq}>
                  {eq}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sistemas asignados</label>
            <div className="grid grid-cols-2 gap-2">
              {sistemasDisponibles.map((sistema, i) => (
                <label key={i} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.sistemas.includes(sistema)}
                    onChange={() => toggleSistema(sistema)}
                    className="form-checkbox text-blue-900 focus:ring-blue-900"
                  />
                  <span className="text-sm">{sistema}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleGuardar}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
