import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
// import { login, register } from "../features/redux/users/userSlice";
// import { useDispatch } from "react-redux";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.users);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    //send user to login
    if (!user.email) {
      navigate("/login");
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axiosInstance.get("/api/v1/users");
    setData(response.data.results);
  };

  return (
    <>
      <ResponsiveAppBar />
      <div>Dashboard</div>
      {data.map((user, index) => (
        <div key={index} className="userInfo">
          <p>Email: {user.email}</p>
          <p>Role {user.role}</p>
        </div>
      ))}
    </>
  );
};

export default Dashboard;
