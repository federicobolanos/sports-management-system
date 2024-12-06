import API from "./api";

export const getReservations = async (filters = {}) => {
  const { data } = await API.get("/reservations", { params: filters });
  return data;
};

export const createReservation = async (reservation) => {
  const { data } = await API.post("/reservations", reservation);
  return data;
};

export const updateReservation = async (id, updates) => {
  const { data } = await API.put(`/reservations/${id}`, updates);
  return data;
};

export const deleteReservation = async (id) => {
  const { data } = await API.delete(`/reservations/${id}`);
  return data;
};