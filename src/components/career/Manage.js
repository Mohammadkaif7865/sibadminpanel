import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { compareAsc, format } from 'date-fns'

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { BACKEND_URL, API_TOKEN, API_URL } from "../../Constants.js";

import Layout from '../Layout';

import { Store } from '../../Store';

function CareerManage() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;
    const navigate = useNavigate();

    const [careers, setCareers] = useState();

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': API_TOKEN
    }

    const getCareers = async () => {
      const res = await axios.get(`${API_URL}home/career/all`, {
          headers: headers
        }).catch((err) => console.log(err));
        const data = await res.data;
        if(data.careers) {
          setCareers(data.careers);
        }
    };
    useEffect(() => {
      getCareers();
    }, []);


    const deleteCareer = async (id) => {

      const res = await axios
        .post(`${API_URL}home/career/delete`, {id: id}, {
            headers: headers
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleDelete = (id) => {

      if(window.confirm("Want to delete?")) {
        deleteCareer(id)
          .then((data) => {
            if(!data.error) {
              toast.success(data.message);
              setCareers(careers.filter(career => career.id !== id));
            } else {
              toast.error(data.message);
            }
          });
      }

    };

    return (
      <Layout>
        <Helmet>
          <title>Career Manage</title>
        </Helmet>
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Career Manage</h4>

        <div className="card">
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {careers &&
                careers.map((career, index) => (
                <tr key={career.id}>
                  <td><strong>{career.fname}</strong></td>
                  <td><strong>{career.lname}</strong></td>
                  <td>{career.email}</td>
                  <td>{career.phone}</td>
                  <td>{format(new Date(career.createdAt), 'yyyy-MM-dd')}</td>
                  <td>
                    <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">

                      {adminInfo[0].can_access.split(',').includes('CareerView') &&
                        <Link className="dropdown-item" to={`/career/view/`+career.id}><i className="bx bx-info-circle me-1"></i> Full Details</Link>
                      }

                        {adminInfo[0].can_access.split(',').includes('CareerDelete') &&
                        <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); handleDelete(career.id)}}><i className="bx bx-trash me-1"></i> Delete</a>
                        }

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

export default CareerManage;
