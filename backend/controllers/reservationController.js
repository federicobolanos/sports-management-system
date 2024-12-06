const Reservation = require("../models/Reservation");

exports.getReservations = async (req, res) => {
  const { facility, date } = req.query; // Recibir filtros opcionales

  try {
    const filters = { user: req.user._id }; // Solo reservas del usuario autenticado

    if (facility) {
      filters.facility = { $regex: facility, $options: "i" }; // Búsqueda parcial, case-insensitive
    }
    if (date) {
      filters.date = date; // Filtrar por fecha exacta
    }

    const reservations = await Reservation.find(filters);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reservas" });
  }
};

// Crear una nueva reserva con validaciones
exports.createReservation = async (req, res) => {
  const { facility, date, time } = req.body;

  if (!facility || !date || !time) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    // Validar que la fecha no sea en el pasado
    const now = new Date();
    const reservationDate = new Date(date);
    if (reservationDate < now) {
      return res.status(400).json({ message: "La fecha no puede estar en el pasado" });
    }

    // Verificar si ya existe una reserva en el mismo horario e instalación
    const conflict = await Reservation.findOne({ facility, date, time });
    if (conflict) {
      return res
        .status(400)
        .json({ message: "Ya existe una reserva para esta instalación y horario" });
    }

    // Crear la nueva reserva
    const reservation = new Reservation({
      user: req.user._id,
      facility,
      date,
      time,
    });

    const createdReservation = await reservation.save();
    res.status(201).json(createdReservation);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la reserva" });
  }
};

// Actualizar una reserva con validaciones
exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const { facility, date, time } = req.body;

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    // Verificar que el usuario sea el propietario
    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado para actualizar esta reserva" });
    }

    // Validar que la nueva fecha no sea en el pasado
    if (date) {
      const now = new Date();
      const reservationDate = new Date(date);
      if (reservationDate < now) {
        return res.status(400).json({ message: "La fecha no puede estar en el pasado" });
      }
    }

    // Verificar conflictos si se actualizan instalación, fecha u hora
    if (facility || date || time) {
      const conflict = await Reservation.findOne({
        facility: facility || reservation.facility,
        date: date || reservation.date,
        time: time || reservation.time,
        _id: { $ne: id }, // Excluir la reserva actual
      });

      if (conflict) {
        return res
          .status(400)
          .json({ message: "Ya existe una reserva para esta instalación y horario" });
      }
    }

    // Actualizar los datos de la reserva
    reservation.facility = facility || reservation.facility;
    reservation.date = date || reservation.date;
    reservation.time = time || reservation.time;

    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la reserva" });
  }
};

// Eliminar una reserva
exports.deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la reserva por ID
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      console.error(`Reserva con id ${id} no encontrada.`);
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    // Verificar que el usuario sea el propietario de la reserva
    if (reservation.user.toString() !== req.user._id.toString()) {
      console.error(`Usuario no autorizado para eliminar esta reserva: ${req.user._id}`);
      return res.status(403).json({ message: "No autorizado para eliminar esta reserva" });
    }

    // Eliminar la reserva
    await Reservation.deleteOne({ _id: id });
    res.json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la reserva:", error.message);
    res.status(500).json({ message: "Error al eliminar la reserva" });
  }
};