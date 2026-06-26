import API from "./api";

export const markLessonComplete = async (lessonId) => {
  return await API.post(`/progress/complete/${lessonId}`);
};

export const getProgress = async () => {
  return await API.get("/progress");
};