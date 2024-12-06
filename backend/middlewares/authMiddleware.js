const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Verifica si el token está presente en los encabezados
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extrae el token del encabezado
      token = req.headers.authorization.split(" ")[1];

      // Verifica y decodifica el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busca al usuario asociado al token
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Pasa al siguiente middleware o controlador
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "No autorizado, token inválido" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No autorizado, falta token" });
  }
};

module.exports = { protect };