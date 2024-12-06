import React, { useState, useEffect } from "react";
import {
  getReservations,
  createReservation,
  deleteReservation,
  updateReservation,
} from "../services/reservationService";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    facility: "",
    date: "",
    time: "",
  });
  const [editingReservation, setEditingReservation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations();
      setReservations(data);
    };
    fetchReservations();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    // Validar instalación seleccionada
    if (!newReservation.facility) {
      alert("Por favor, selecciona una instalación.");
      return;
    }

    // Validar hora seleccionada
    if (!newReservation.time) {
      alert("Por favor, selecciona una hora válida.");
      return;
    }

    try {
      if (editingReservation) {
        await updateReservation(editingReservation._id, newReservation);
        setEditingReservation(null);
      } else {
        await createReservation(newReservation);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error al crear/actualizar la reserva:", error);
      alert("Ocurrió un error al guardar la reserva.");
    }
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
    setNewReservation({
      facility: reservation.facility,
      date: reservation.date.split("T")[0],
      time: reservation.time,
    });
  };

  const handleCancelEdit = () => {
    setEditingReservation(null);
    setNewReservation({ facility: "", date: "", time: "" });
  };

  const handleDelete = async (id) => {
    await deleteReservation(id);
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reservas</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Cerrar sesión
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {editingReservation ? "Actualizar reserva" : "Crear reserva"}
        </h3>
        <form onSubmit={handleCreate} className="space-y-4">
          <select
            value={newReservation.facility}
            onChange={(e) =>
              setNewReservation({ ...newReservation, facility: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una instalación</option>
            <option value="Cancha de fútbol">Cancha de fútbol</option>
            <option value="Cancha de tenis">Cancha de tenis</option>
            <option value="Piscina">Piscina</option>
            <option value="Gimnasio">Gimnasio</option>
            <option value="Pista de atletismo">Pista de atletismo</option>
          </select>
          <input
            type="date"
            value={newReservation.date}
            onChange={(e) =>
              setNewReservation({ ...newReservation, date: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="time"
            value={newReservation.time}
            onChange={(e) =>
              setNewReservation({ ...newReservation, time: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {editingReservation ? "Actualizar reserva" : "Crear reserva"}
            </button>
            {editingReservation && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </div>
      <ul className="space-y-4">
        {reservations.map((res) => (
          <li
            key={res._id}
            className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-bold">{res.facility}</p>
              <p className="text-sm text-gray-600">
                {res.date.split("T")[0]} - {res.time}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(res)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(res._id)}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsPage;
