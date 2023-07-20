import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminPrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`/api/v1/auth/admin-auth`);
      console.log(res.data.ok);
      if (res.data.ok) setOk(true);
      else setOk(false);
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet></Outlet> : <Spinner path=""></Spinner>;
};

export default AdminPrivateRoute;
