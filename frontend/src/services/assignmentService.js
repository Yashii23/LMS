import API from "./api";

export const getAssignments = async () => {
  return await API.get("/assignments");
};

export const getAssignment = async (id) => {
  return await API.get(`/assignments/${id}`);
};

export const createAssignment = async (data) => {
  return await API.post("/assignments", data);
};

export const updateAssignment = async (id, data) => {
  return await API.put(`/assignments/${id}`, data);
};

export const deleteAssignment = async (id) => {
  return await API.delete(`/assignments/${id}`);
};