import API from "./api";

export const enrollCourse = async (courseId) => {
  return await API.post("/enrollments/enroll", {
    courseId,
  });
};

export const getMyCourses = async () => {
  return await API.get("/enrollments/my-courses");
};