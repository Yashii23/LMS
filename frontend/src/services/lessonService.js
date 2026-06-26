import API from "./api";

export const getLessons = async (courseId) => {

    const res = await API.get(`/lessons/course/${courseId}`);

    return res.data.lessons;

};

export const getLesson = async (lessonId) => {

    const res = await API.get(`/lessons/${lessonId}`);

    return res.data;

};