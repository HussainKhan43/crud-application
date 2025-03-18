import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import profile from "../assets/nodir.png";
import { NavLink, useParams ,useNavigate} from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function Details() {
    const navigate = useNavigate();

  const { id } = useParams(); 
  const [userData, setUserData] = useState({}); // Set initial state as an object

  const getdata = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await res.json();
      setUserData(data); 
      console.log("Data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, [id]); // Add `id` as a dependency

  // Function to delete user
  const deleteuser = async (userId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/deleteuser/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      alert("User deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome {userData?.name || "User"}</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${userData._id}`}>
              <button className="btn btn-primary mx-2">
                <i className="fa-solid fa-pen"></i>
              </button>
            </NavLink>
            <button className="btn btn-danger" onClick={() => deleteuser(userData._id)}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src={profile} style={{ width: 50 }} alt="profile" />
              <h3 className="mt-3">Name: <span>{userData?.name}</span></h3>
              <h3 className="mt-3">Age: <span>{userData?.age}</span></h3>
              <p className="mt-3">
                <i className="fa-solid fa-envelope"></i> Email:
                <span> {userData?.email} </span>
              </p>
              <p className="mt-3">
                <i className="fa-solid fa-briefcase"></i> Occupation:
                <span> {userData?.work} </span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <i className="fa-solid fa-mobile"></i> Mobile:
                <span> {userData?.mobile} </span>
              </p>
              <p className="mt-3">
                <i className="fa-solid fa-location-dot"></i> Location:
                <span> {userData?.address || "No location provided"} </span>
              </p>
              <p className="mt-3">
                Description:
                <span> {userData?.description || "No description provided"} </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Details;
