import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [students, setStudent] = useState([]);

  const {id} = useParams()
  
  useEffect(() => {
    getAllStudent();
  }, []);

  const getAllStudent = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/users");
    setStudent(result.data);
  };

  const deleteStudent = async (id) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    
    // If the user confirms, proceed with the deletion
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/user/${id}`);
        alert("Student deleted successfully.");
        getAllStudent();

      } catch (error) {
        console.error("There was an error deleting the student:", error);
        alert("Failed to delete the student.");
      }
    } else {
      alert("Student deletion canceled.");
    }
  };
  
  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Standard</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          
          <tbody>
            {students.map((student,index) => (
              <tr>
                     <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.standard}</td>
                <td>
                    <Link className="btn btn-primary mx-2" to={`/viewuser/${student.id}`}>View</Link>
                    <Link className="btn btn-outline-primary mx-2" to={`/editUser/${student.id}`}>Edit</Link>
                    <button className="btn btn-danger mx-2" onClick={()=> deleteStudent(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
