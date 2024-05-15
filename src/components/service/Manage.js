import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { BACKEND_URL, API_TOKEN, API_URL } from "../../Constants.js";

import Layout from '../Layout';

function ServiceManage() {

    const navigate = useNavigate();

    const [services, setServices] = useState();

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': API_TOKEN
    }

    const getServices = async () => {
      const res = await axios.get(`${API_URL}service/all`, {
          headers: headers
        }).catch((err) => console.log(err));
        const data = await res.data;
        if(data.services) {
          setServices(data.services);
        }
    };
    useEffect(() => {
      getServices();
    }, []);


    const deleteService = async (id) => {

      const res = await axios
        .post(`${API_URL}service/delete`, {id: id}, {
            headers: headers
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleDelete = (id) => {

      if(window.confirm("Want to delete?")) {
        deleteService(id)
          .then((data) => {
            if(!data.error) {
              toast.success(data.message);
              setServices(services.filter(service => service.id !== id));
            } else {
              toast.error(data.message);
            }
          });
      }

    };

    return (
      <Layout>
        <Helmet>
          <title>Service Manage</title>
        </Helmet>
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Service Manage</h4>

        <div className="card">
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Order</th>
                  <th>Publish</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {services &&
                services.map((service, index) => (
                <tr key={service.id}>
                  <td><strong>{service.name}</strong></td>
                  <td>
                    <img style={{width: '100px'}} src={BACKEND_URL+service.image} />
                  </td>
                  <td>{service.description}</td>
                  <td>{service.corder}</td>
                  <td>{service.publish == 1 ? ( <>Yes</> ) : (<>No</>)}</td>
                  <td>
                    <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to={`/service/edit/`+service.id}><i className="bx bx-edit-alt me-1"></i> Edit</Link>
                        <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); handleDelete(service.id)}}><i className="bx bx-trash me-1"></i> Delete</a>
                      </div>
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </Layout>
    );
}

export default ServiceManage;
