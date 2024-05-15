import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { BACKEND_URL, API_TOKEN, API_URL } from "../../Constants.js";

import Layout from '../Layout';

function UserManage() {

    const navigate = useNavigate();

    const [users, setUsers] = useState();

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': API_TOKEN
    }

    const getUsers = async () => {
      const res = await axios.get(`${API_URL}user/all`, {
          headers: headers
        }).catch((err) => console.log(err));
        const data = await res.data;
        if(data.users) {
          setUsers(data.users);
        }
    };
    useEffect(() => {
      getUsers();
    }, []);


    const deleteUser = async (id) => {

      const res = await axios
        .post(`${API_URL}user/delete`, {id: id}, {
            headers: headers
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleDelete = (id) => {

      if(window.confirm("Want to delete?")) {
        deleteUser(id)
          .then((data) => {
            if(!data.error) {
              toast.success(data.message);
              setUsers(users.filter(user => user.id !== id));
            } else {
              toast.error(data.message);
            }
          });
      }

    };

    return (
      <Layout>
        <Helmet>
          <title>User Manage</title>
        </Helmet>

        <div className="row">
          <div className="col-md-6">
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> User Manage</h4>
          </div>
          <div className="col-md-6" style={{'textAlign': 'right'}}>
            <Link to="/user/add" className="btn btn-primary">Add</Link>
          </div>
        </div>

        <div className="card">
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {users &&
                users.map((user, index) => (
                <tr key={user.id}>
                  <td><strong>{user.name}</strong></td>
                  <td>{user.email}</td>
                  <td>
                    <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to={`/user/edit/`+user.id}><i className="bx bx-edit-alt me-1"></i> Edit</Link>
                        <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); handleDelete(user.id)}}><i className="bx bx-trash me-1"></i> Delete</a>
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

export default UserManage;
