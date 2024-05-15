import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Store } from '../../Store';

import { API_TOKEN, API_URL } from "../../Constants.js";

import Layout from '../Layout';

function UserAdd() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;
    const navigate = useNavigate();

    const modules = [
      {
        name: 'Category Add',
        value: 'CategoryAdd',
      },
      {
        name: 'Category Manage',
        value: 'CategoryManage',
      },
      {
        name: 'Category Edit',
        value: 'CategoryEdit',
      },
      {
        name: 'Category Delete',
        value: 'CategoryDelete',
      },
      {
        name: 'Blog Add',
        value: 'BlogAdd',
      },
      {
        name: 'Blog Manage',
        value: 'BlogManage',
      },
      {
        name: 'Blog Edit',
        value: 'BlogEdit',
      },
      {
        name: 'Blog Delete',
        value: 'BlogDelete',
      },
      {
        name: 'Enquiry Manage',
        value: 'EnquiryManage',
      },
      {
        name: 'Enquiry Delete',
        value: 'EnquiryDelete',
      },
      {
        name: 'Career Manage',
        value: 'CareerManage',
      },
      {
        name: 'Career View',
        value: 'CareerView',
      },
      {
        name: 'Career Delete',
        value: 'CareerDelete',
      }
    ];

    const [inputs, setInputs] = useState({
      name: "",
      email: "",
      password: "",
      can_access: [],
    });

    const handleInputChange = (e) => {

      let value = '';

      if(e.target.type == 'checkbox') {
        if(e.target.checked) {
          value = [...inputs.can_access, e.target.value];
        } else {
          value = inputs.can_access.filter(function(checkVal) {
              return checkVal !== e.target.value;
          })
        }
      } else {
        value = e.target.value;
      }

      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: value,
      }));

    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': API_TOKEN
    }

    const addUser = async () => {

      const res = await axios
        .post(`${API_URL}user/add`, {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
          can_access: inputs.can_access
        }, {
            headers: headers
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;

    };

    const handleSubmit = (e) => {
      e.preventDefault();

      addUser()
        .then((data) => {
          if(!data.error) {
            toast.success(data.message);
            navigate('/user');
          } else {
            toast.error(data.message);
          }
        })

    };

    return (
      <Layout>
        <Helmet>
          <title>User Add</title>
        </Helmet>
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> User Add</h4>
        <div className="row">
          <div className="col-xl">
            <div className="card mb-4">

              <div className="card-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" required onChange={handleInputChange}
                    value={inputs.name} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" required onChange={handleInputChange}
                    value={inputs.email} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" required onChange={handleInputChange}
                    value={inputs.password} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Can Access</label><br />
                    {modules &&
                      modules.map((module, index) => (
                        <><input key={index} type="checkbox" name="can_access" onChange={handleInputChange} value={module.value} /> {module.name} <br /></>
                    ))}
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default UserAdd;
