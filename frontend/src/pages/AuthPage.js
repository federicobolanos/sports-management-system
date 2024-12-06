import React, { useState } from "react";
import { register, login } from "../services/authService";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(formData);
        alert("Registro exitoso");
      } else {
        await login({ email: formData.email, password: formData.password });
        alert("Inicio de sesión exitoso");
      }
      window.location.reload(); // Recargar para redirigir
    } catch (error) {
      console.error(error);
      alert("Error en la autenticación");
    }
  };

  return (
    <div>
      <h2>{isRegister ? "Registro" : "Inicio de sesión"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">{isRegister ? "Registrarse" : "Iniciar sesión"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Ya tienes cuenta? Inicia sesión" : "No tienes cuenta? Regístrate"}
      </button>
    </div>
  );
};

export default AuthPage;