import Layout from "../../components/layout/Layout";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "../../styles/authStyles.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
        email,
      });
      if (res?.data?.success === false) toast.error(res?.data?.message);
      else toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error("Error resetting password!!");
    }
  };
  return (
   <Layout>
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
            <div className="row mb-4">
              <div className="col">
                <Link to={"/login"}>Login?</Link>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
