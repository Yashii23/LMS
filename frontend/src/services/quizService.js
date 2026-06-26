import API from "./api";

export const getQuizzes = async () => {
  return API.get("/quizzes");
};

export const getQuiz = async (id) => {
  return API.get(`/quizzes/${id}`);
};

export const createQuiz = async (data) => {
  return API.post("/quizzes", data);
};

export const addQuestion = async (data) => {
  return API.post("/quizzes/question", data);
};

export const submitQuiz = async (data) => {
  return API.post("/quizzes/submit", data);
};

export const getResults = async () => {
  return API.get("/quizzes/results/my");
};