import API from "./api";

export const enrollCourse = (
  courseId
) => {
  return API.post(
    "/enrollments/enroll",
    {
      courseId,
    }
  );
};

export const getMyCourses = () => {
  return API.get(
    "/enrollments/my-courses"
  );
};