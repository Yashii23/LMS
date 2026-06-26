import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { submitAssignment } from "../services/submissionService";

function AssignmentDetails() {
  const { id } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    loadAssignment();
  }, []);

  const loadAssignment = async () => {
    try {
      const res = await API.get(`/assignments/${id}`);
      setAssignment(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    if (!fileUrl) {
      return alert("Enter Assignment File URL");
    }

    try {
      await submitAssignment({
        assignmentId: id,
        fileUrl,
      });

      alert("Assignment Submitted Successfully");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Submission Failed"
      );
    }
  };

  if (!assignment)
    return <h2>Loading...</h2>;

  return (
    <div className="container">

      <h1>{assignment.title}</h1>

      <br />

      <p>{assignment.description}</p>

      <br />

      <h3>
        Due Date :
        {" "}
        {new Date(
          assignment.dueDate
        ).toLocaleDateString()}
      </h3>

      <h3>
        Maximum Marks :
        {" "}
        {assignment.maxMarks}
      </h3>

      <br />

      <input
        type="text"
        placeholder="Paste PDF / Google Drive / GitHub Link"
        value={fileUrl}
        onChange={(e) =>
          setFileUrl(e.target.value)
        }
      />

      <br />
      <br />

      <button
        className="btn"
        onClick={handleSubmit}
      >
        Submit Assignment
      </button>

    </div>
  );
}

export default AssignmentDetails;