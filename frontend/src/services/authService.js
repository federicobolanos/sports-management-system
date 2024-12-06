import API from "./api";

export const register = async (userData) => {
  const { data } = await API.post("/users/register", userData);
  localStorage.setItem("token", data.token); // Guardar el token en localStorage
  return data;
};

export const login = async (credentials) => {
  const { data } = await API.post("/users/login", credentials);
  localStorage.setItem("token", data.token); // Guardar el token en localStorage
  return data;
};

export const logout = () => {
  localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
};