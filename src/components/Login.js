import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Store } from '../Store';

import { API_TOKEN, API_URL } from "../Constants.js";

import './Login.css';

function Login() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;
    const navigate = useNavigate();

    useEffect(() => {
      if (adminInfo) {
        navigate("/dashboard");
      }
    }, [navigate, adminInfo]);

    const [inputs, setInputs] = useState({
      email: "",
      password: "",
    });

    const handleInputChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': API_TOKEN
    }

    const doLogin = async () => {
      const res = await axios
        .post(`${API_URL}admin/login`, {
          email: inputs.email,
          password: inputs.password
        }, {
            headers: headers
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };
    const handleLogin = (e) => {
      e.preventDefault();
      doLogin()
        .then((data) => {
          if(data.admin) {
            toast.success(data.message);
            ctxDispatch({ type: 'ADMIN_SIGNIN', payload: data.admin });
            localStorage.setItem('adminInfo', JSON.stringify(data.admin));
            navigate('/dashboard');
          } else {
            toast.error(data.message);
          }
        })

    };

    return (
      <div className="container-xxl">
      <Helmet>
        <title>Login</title>
      </Helmet>
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center">
                  <a href="#" className="app-brand-link gap-2">
                    <span className="app-brand-logo demo">

                    </span>
                    <span className="app-brand-text demo text-body fw-bolder">SIB Infotech</span>
                  </a>
                </div>
                <h4 className="mb-2">Welcome to SIB Infotech!</h4>
                <p className="mb-4">Please sign-in to your account</p>

                <form onSubmit={handleLogin} id="formAuthentication" className="mb-3" action="" method="POST">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="" required

                      onChange={handleInputChange}
                      value={inputs.email}
                    />
                  </div>
                  <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                      <label className="form-label">Password</label>
                    </div>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        placeholder=""
                        aria-describedby="password" required

                        onChange={handleInputChange}
                        value={inputs.password}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login;
