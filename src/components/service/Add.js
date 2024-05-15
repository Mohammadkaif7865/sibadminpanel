import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Store } from '../../Store';

import { API_TOKEN, API_URL } from "../../Constants.js";

import Layout from '../Layout';

function ServiceAdd() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
      name: "",
      description: "",
      corder: "",
      publish: 1,
    });

    const [selectedFile, setSelectedFile] = useState();

    const handleInputChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const handleFileChange = (event) => {
  		setSelectedFile(event.target.files[0]);
  	};

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': API_TOKEN
    }

    const addService = async () => {

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('name', inputs.name);
      formData.append('description', inputs.description);
      formData.append('corder', inputs.corder);
      formData.append('publish', inputs.publish);

      const res = await axios
        .post(`${API_URL}service/add`, formData, {
            headers: headers
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      addService()
        .then((data) => {
          if(!data.error) {
            toast.success(data.message);
            navigate('/service');
          } else {
            toast.error(data.message);
          }
        })

    };

    return (
      <Layout>
        <Helmet>
          <title>Service Add</title>
        </Helmet>
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Service Add</h4>
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
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" required onChange={handleFileChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={inputs.description} onChange={handleInputChange}
                    ></textarea>
                  </div>
                    <div className="mb-3">
                      <label className="form-label">Order</label>
                      <input type="number" className="form-control" name="corder" onChange={handleInputChange}
                      value={inputs.corder} />
                    </div>
                      <div className="mb-3">
                        <label className="form-label">Publish</label>
                        <select className="form-control" name="publish" value={inputs.publish} onChange={handleInputChange} required>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </select>
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

export default ServiceAdd;
