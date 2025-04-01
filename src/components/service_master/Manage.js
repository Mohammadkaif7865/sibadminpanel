// pages/ServiceManage.jsx
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../Layout";
import { Store } from "../../Store";
import { API_URL, API_TOKEN } from "../../Constants";

function ServiceManage() {
  const { state } = useContext(Store);
  const { adminInfo } = state;
  const [services, setServices] = useState([]);
  const [keyword, setKeyword] = useState("");

  const headers = {
    "Content-Type": "application/json",
    Authorization: API_TOKEN,
  };

  const getServices = async () => {
    const res = await axios.get(`${API_URL}service/all`, { headers });
    const data = await res.data;
    if (data.services) setServices(data.services);
  };

  useEffect(() => {
    getServices();
  }, []);

  const deleteService = async (id) => {
    const res = await axios.post(
      `${API_URL}service/delete`,
      { id },
      { headers }
    );
    return res.data;
  };

  const handleDelete = (id) => {
    if (window.confirm("Want to delete?")) {
      deleteService(id).then((data) => {
        if (!data.error) {
          toast.success(data.message);
          setServices(services.filter((item) => item.id !== id));
        } else {
          toast.error(data.message);
        }
      });
    }
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <Layout>
      <Helmet>
        <title>Service Manage</title>
      </Helmet>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Service Manage</h4>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search"
            onChange={(e) => setKeyword(e.target.value)}
          />
          {adminInfo[0].can_access.includes("ServiceMasterAdd") && (
            <Link to="/service-master/add" className="btn btn-primary">
              Add
            </Link>
          )}
        </div>
      </div>
      <div className="card">
        <div className="table-responsive">
          <table className="table" style={{"minHeight": "175px"}}>
            <thead>
              <tr>
                <th>Actions</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id}>
                  <td>
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn p-0 dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                        {adminInfo[0].can_access.includes(
                          "ServiceMasterEdit"
                        ) && (
                          <Link
                            className="dropdown-item"
                            to={`/service-master/edit/${service.id}`}
                          >
                            <i className="bx bx-edit-alt me-1"></i> Edit
                          </Link>
                        )}
                        {adminInfo[0].can_access.includes(
                          "ServiceMasterDelete"
                        ) && (
                          <button
                            className="dropdown-item"
                            onClick={() => handleDelete(service.id)}
                          >
                            <i className="bx bx-trash me-1"></i> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{service.name}</td>
                  <td>{service.slug}</td>
                  <td>{service.region}</td>
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
