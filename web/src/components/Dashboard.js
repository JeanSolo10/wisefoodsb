import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
// import { login, register } from "../features/redux/users/userSlice";
// import { useDispatch } from "react-redux";

const Dashboard = () => {
  const [data, setData] = useState([]);

  // const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axiosInstance.get("/api/v1/users");
    setData(response.data.results);
  };

  return (
    <>
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
