import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">

        <img
          src={
            course.thumbnail ||
            "https://via.placeholder.com/400x200"
          }
          className="card-img-top"
          alt={course.title}
        />

        <div className="card-body">

          <h5>{course.title}</h5>

          <p>{course.description}</p>

          <p>
            <strong>Category:</strong>{" "}
            {course.category}
          </p>

          <p>
            <strong>Level:</strong>{" "}
            {course.level}
          </p>

          <p>
            <strong>Price:</strong> ₹
            {course.price}
          </p>

          <Link
            to={`/courses/${course._id}`}
            className="btn btn-primary"
          >
            View Course
          </Link>

        </div>
      </div>
    </div>
  );
};

export default CourseCard;