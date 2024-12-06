import React, { useState, useEffect } from "react";
import {
  getReservations,
  createReservation,
  deleteReservation,
} from "../services/reservationService";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    facility: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations();
      setReservations(data);
    };
    fetchReservations();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createReservation(newReservation);
    window.location.reload();
  };

  const handleDelete = async (id) => {
    await deleteReservation(id);
    window.location.reload();
  };

  return (
    <div>
      <h2>Reservas</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Instalación"
          value={newReservation.facility}
          onChange={(e) =>
            setNewReservation({ ...newReservation, facility: e.target.value })
          }
        />
        <input
          type="date"
          value={newReservation.date}
          onChange={(e) =>
            setNewReservation({ ...newReservation, date: e.target.value })
          }
        />
        <input
          type="time"
          value={newReservation.time}
          onChange={(e) =>
            setNewReservation({ ...newReservation, time: e.target.value })
          }
        />
        <button type="submit">Crear reserva</button>
      </form>

      <ul>
        {reservations.map((res) => (
          <li key={res._id}>
            {res.facility} - {res.date} - {res.time}
            <button onClick={() => handleDelete(res._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsPage;