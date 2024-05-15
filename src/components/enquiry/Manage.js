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

function EnquiryManage() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;
    const navigate = useNavigate();

    const [enquiries, setEnquiries] = useState();

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': API_TOKEN
    }

    const getEnquiries = async () => {
      const res = await axios.get(`${API_URL}home/enquiry/all`, {
          headers: headers
        }).catch((err) => console.log(err));
        const data = await res.data;
        if(data.enquiries) {
          setEnquiries(data.enquiries);
        }
    };
    useEffect(() => {
      getEnquiries();
    }, []);


    const deleteEnquiry = async (id) => {

      const res = await axios
        .post(`${API_URL}home/enquiry/delete`, {id: id}, {
            headers: headers
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleDelete = (id) => {

      if(window.confirm("Want to delete?")) {
        deleteEnquiry(id)
          .then((data) => {
            if(!data.error) {
              toast.success(data.message);
              setEnquiries(enquiries.filter(enquiry => enquiry.id !== id));
            } else {
              toast.error(data.message);
            }
          });
      }

    };

    return (
      <Layout>
        <Helmet>
          <title>Enquiry Manage</title>
        </Helmet>
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Enquiry Manage</h4>

        <div className="card">
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Details</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {enquiries &&
                enquiries.map((enquiry, index) => (
                <tr key={enquiry.id}>
                  <td><strong>{enquiry.name}</strong></td>
                  <td><strong>{enquiry.cname}</strong></td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.phone}</td>
                  <td>{enquiry.details}</td>
                  <td>{format(new Date(enquiry.createdAt), 'yyyy-MM-dd')}</td>
                  <td>
                    <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                      {adminInfo[0].can_access.split(',').includes('EnquiryDelete') &&
                        <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); handleDelete(enquiry.id)}}><i className="bx bx-trash me-1"></i> Delete</a>
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

export default EnquiryManage;
