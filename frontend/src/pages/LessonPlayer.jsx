import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { markLessonComplete } from "../services/progressService";

function LessonPlayer() {
  const { lessonId } = useParams();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  const loadLesson = async () => {
    try {
      const res = await API.get(`/lessons/${lessonId}`);
      setLesson(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load lesson");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      const res = await markLessonComplete(lessonId);

      alert(res.data.message || "Lesson Completed");

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Failed to complete lesson"
      );
    }
  };

  const getYoutubeEmbed = (url) => {
    if (!url) return "";

    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }

    if (url.includes("youtu.be/")) {
      return url.replace(
        "youtu.be/",
        "www.youtube.com/embed/"
      );
    }

    return url;
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container">

      <h1>{lesson.title}</h1>

      <iframe
        width="100%"
        height="500"
        src={getYoutubeEmbed(lesson.videoUrl)}
        title={lesson.title}
        allowFullScreen
      />

      <h2>{lesson.title}</h2>

      <p>{lesson.description}</p>

      <p>
        <strong>Duration:</strong> {lesson.duration}
      </p>

      <button
        className="btn"
        onClick={handleComplete}
      >
        Mark Complete
      </button>

    </div>
  );
}

export default LessonPlayer;