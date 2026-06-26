import API from "./api";

export const submitAssignment = async (data) => {
  return await API.post("/submissions/submit", data);
};

export const getMySubmissions = async () => {
  return await API.get("/submissions/my-submissions");
};

export const getAllSubmissions = async () => {
  return await API.get("/submissions");
};

export const reviewSubmission = async (id, data) => {
  return await API.put(`/submissions/${id}/review`, data);
};

export const deleteSubmission = async (id) => {
  return await API.delete(`/submissions/${id}`);
};