import API from "./api";

// Get all courses
export const getCourses = () => API.get("/courses");

// Get single course
export const getCourse = (id) =>
  API.get(`/courses/${id}`);

// Create course
export const createCourse = (data) =>
  API.post("/courses", data);

// Update course
export const updateCourse = (id, data) =>
  API.put(`/courses/${id}`, data);

// Delete course
export const deleteCourse = (id) =>
  API.delete(`/courses/${id}`);