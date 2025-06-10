import React, { useState } from "react";

export default function ModalEditarColaborador({ colaborador, onClose, onGuardar }) {
  const [form, setForm] = useState({
    id: colaborador.id,
    nombre: colaborador.nombre,
    puesto: colaborador.puesto,
    area: colaborador.area,
    ingreso: colaborador.ingreso,
    estado: colaborador.estado,
    observacion: colaborador.observacion,
    equipo: colaborador.equipo,
    sistemas: colaborador.sistemas || []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    onGuardar(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-violet-700">Editar Colaborador</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            name="puesto"
            placeholder="Puesto"
            value={form.puesto}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            name="area"
            placeholder="Área"
            value={form.area}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            name="ingreso"
            value={form.ingreso}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <input
            type="text"
            name="observacion"
            placeholder="Observación"
            value={form.observacion}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            name="equipo"
            placeholder="Equipo asignado"
            value={form.equipo}
            onChange={handleChange}
            className="border rounded px-3 py-2 col-span-2"
          />
          <input
            type="text"
            name="sistemas"
            placeholder="Sistemas (separados por coma)"
            value={form.sistemas.join(", ")}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                sistemas: e.target.value.split(",").map((s) => s.trim())
              }))
            }
            className="border rounded px-3 py-2 col-span-2"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
