import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/auth";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
      if (res && res?.data?.success === false) {
        toast.error(res?.data?.message);
      } else if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };

  return (
    <>
      <Layout title={"Login-Page"}>
        <div className="outer-container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="form-outline mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="row mb-4">
                <div className="col">
                  <Link to={"/forgot-password"}>Forgot Password?</Link>
                  <Link to={"/verify-email"}>Verify Email</Link>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
