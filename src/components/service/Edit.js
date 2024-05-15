import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Store } from '../../Store';

import * as constants from "../../Constants";

import Layout from '../Layout';

function ServiceEdit() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;
    const navigate = useNavigate();

    const {API_TOKEN, API_URL, BACKEND_URL} = constants;

    const [inputs, setInputs] = useState({
      name: "",
      image: "",
      description: "",
      corder: "",
      publish: "",
    });

    const [selectedFile, setSelectedFile] = useState();

    const { id } = useParams();

    const getService = async () => {
      const res = await axios.get(`${API_URL}service/single/${id}`, {
          headers: headers
        }).catch((err) => console.log(err));
        const data = await res.data;
        if(data.service) {
          setInputs({
            name: data.service[0].name,
            image: data.service[0].image,
            description: data.service[0].description,
            corder: data.service[0].corder,
            publish: data.service[0].publish,
          });
        }
    };
    useEffect(() => {
      getService();
    }, [navigate, id]);

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

    const editService = async () => {

      const formData = new FormData();
      formData.append('id', id);
      formData.append('image', selectedFile);
      formData.append('name', inputs.name);
      formData.append('imageHidden', inputs.image);
      formData.append('description', inputs.description);
      formData.append('corder', inputs.corder);
      formData.append('publish', inputs.publish);

      const res = await axios
        .post(`${API_URL}service/edit`, formData, {
            headers: headers
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      editService()
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
          <title>Service Edit</title>
        </Helmet>
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Service Edit</h4>
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
                    <input type="file" className="form-control" onChange={handleFileChange} />
                    <input type="hidden" name="imageHidden" value={inputs.image} />
                    <img style={{width: '100px'}} src={BACKEND_URL+inputs.image} />
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

export default ServiceEdit;
