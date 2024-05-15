import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Store } from '../../Store';

import { API_TOKEN, API_URL } from "../../Constants.js";

import Layout from '../Layout';

function CategoryAdd() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
      name: "",
      publish: 1,
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

    const addCategory = async () => {

      const res = await axios
        .post(`${API_URL}category/add`, {
          name: inputs.name,
          publish: inputs.publish
        }, {
            headers: headers
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;

    };

    const handleSubmit = (e) => {
      e.preventDefault();

      addCategory()
        .then((data) => {
          if(!data.error) {
            toast.success(data.message);
            navigate('/category');
          } else {
            toast.error(data.message);
          }
        })

    };

    return (
      <Layout>
        <Helmet>
          <title>Category Add</title>
        </Helmet>
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Category Add</h4>
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

export default CategoryAdd;
