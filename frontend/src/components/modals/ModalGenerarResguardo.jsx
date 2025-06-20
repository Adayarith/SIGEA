import React, { useState, useEffect } from "react";

export default function ModalCompletoResguardo({ onClose }) {
  const [modalGenerarVisible, setModalGenerarVisible] = useState(true);
  const [modalDatosVisible, setModalDatosVisible] = useState(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);
  const [tipoResguardo, setTipoResguardo] = useState("");

  const [form, setForm] = useState({
    responsable: "",
    noColaborador: "",
    puesto: "",
    departamento: "",
    recibe: "",
  });

  const colaboradores = [
    { nombre: "David Ávila", correo: "d.avila@dreams.com" },
    { nombre: "Luis Díaz", correo: "luis.diaz@dreams.com" },
  ];

  const opcionesResguardo = [
    "Equipo de Cómputo",
    "Sistema Innsist",
    "Sistema Birchstreet",
    "Sistema AbrhilSoft",
    "Yubikey",
  ];

  const handleGuardar = () => {
    console.log("Datos Repositorio:", form);
    alert("Datos capturados ");
    setModalDatosVisible(false);
    if (onClose) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {modalGenerarVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
          <div className="bg-white rounded shadow p-5 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Generar Resguardo</h2>

            <ModalGenerarResguardo
              colaboradores={colaboradores}
              opciones={opcionesResguardo}
              onClose={() => {
                setModalGenerarVisible(false);
                if (onClose) onClose();
              }}
              onGenerar={(colaborador, tipo) => {
                setColaboradorSeleccionado(colaborador);
                setTipoResguardo(tipo);
                setForm((prev) => ({ ...prev, responsable: colaborador.nombre }));
                setModalGenerarVisible(false);
                setModalDatosVisible(true);
              }}
            />
          </div>
        </div>
      )}

      {modalDatosVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold text-blue-900 mb-4">Datos para el Repositorio</h2>

            <div className="space-y-3 text-sm">
              <div>
                <label>Responsable:</label>
                <input
                  name="responsable"
                  value={form.responsable}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-1"
                />
              </div>
              <div>
                <label>No. Colaborador:</label>
                <input
                  name="noColaborador"
                  value={form.noColaborador}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-1"
                />
              </div>
              <div>
                <label>Puesto:</label>
                <input
                  name="puesto"
                  value={form.puesto}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-1"
                />
              </div>
              <div>
                <label>Departamento:</label>
                <input
                  name="departamento"
                  value={form.departamento}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-1"
                />
              </div>
              <div>
                <label>Recibe:</label>
                <input
                  name="recibe"
                  value={form.recibe}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-1"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => { setModalDatosVisible(false); if (onClose) onClose(); }} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
                Cancelar
              </button>
              <button onClick={handleGuardar} className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-700">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ModalGenerarResguardo({ colaboradores, opciones, onClose, onGenerar }) {
  const [busqueda, setBusqueda] = useState("");
  const [colaborador, setColaborador] = useState(null);
  const [tipo, setTipo] = useState("");

  const coincidencias = colaboradores.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <div className="mb-3">
        <label className="text-sm font-medium">Nombre del Colaborador:</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-1"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setColaborador(null);
          }}
          placeholder="Buscar colaborador..."
        />
        {busqueda && coincidencias.length > 0 && !colaborador && (
          <ul className="bg-white border rounded shadow mt-1">
            {coincidencias.map((c, i) => (
              <li
                key={i}
                onClick={() => {
                  setColaborador(c);
                  setBusqueda(c.nombre);
                }}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                {c.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-3">
        <label className="text-sm font-medium">Tipo de Resguardo:</label>
        <select
          className="w-full border rounded px-3 py-1"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="">Seleccione una opción</option>
          {opciones.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
          Cancelar
        </button>
        <button
          onClick={() => colaborador && tipo && onGenerar(colaborador, tipo)}
          className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800"
        >
          Generar Resguardo
        </button>
      </div>
    </div>
  );
}
