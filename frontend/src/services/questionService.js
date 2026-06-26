import API from "./api";

export const createQuestion = (data) =>
  API.post("/questions", data);

export const getQuestions = (quizId) =>
  API.get(`/questions/quiz/${quizId}`);

export const getQuestion = (id) =>
  API.get(`/questions/${id}`);

export const updateQuestion = (id, data) =>
  API.put(`/questions/${id}`, data);

export const deleteQuestion = (id) =>
  API.delete(`/questions/${id}`);