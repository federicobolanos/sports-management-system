const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { protect } = require("./middlewares/authMiddleware");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.send("¡Servidor corriendo!");
});

//Ruta Protegida
app.get("/api/protected", protect, (req, res) => {
  res.json({ message: `Hola, ${req.user.name}. Esta es una ruta protegida.` });
});

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar MongoDB:", err));

// Iniciar servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Rutas de usuario
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Rutas de reservación
const reservationRoutes = require("./routes/reservationRoutes");
app.use("/api/reservations", reservationRoutes);