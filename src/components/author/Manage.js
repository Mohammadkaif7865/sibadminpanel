import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { BACKEND_URL, API_TOKEN, API_URL } from "../../Constants.js";

import Layout from '../Layout.js';
import { Store } from '../../Store.js';

function AuthorManage() {

  const { state } = useContext(Store);
  const { adminInfo } = state;
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': API_TOKEN
  };

  const getAuthors = async () => {
    try {
      const res = await axios.get(`${API_URL}author/all`, { headers });
      const data = res.data;
      if (data.authors) {
        setAuthors(data.authors);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  const deleteAuthor = async (id) => {
    try {
      const res = await axios.post(`${API_URL}author/delete`, { id }, { headers });
      return res.data;
    } catch (err) {
      console.error(err);
      return { error: true, message: 'Delete request failed' };
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Want to delete?")) {
      deleteAuthor(id).then((data) => {
        if (!data.error) {
          toast.success(data.message);
          setAuthors(authors.filter(author => author.id !== id));
        } else {
          toast.error(data.message);
        }
      });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Author Manage</title>
      </Helmet>

      <div className="row">
        <div className="col-md-6">
          <h4 className="fw-bold py-3 mb-4">Author Manage</h4>
        </div>
        <div className="col-md-6" style={{ textAlign: 'right' }}>
          {adminInfo[0].can_access.split(',').includes('AuthorAdd') &&
            <Link to="/author/add" className="btn btn-primary">Add</Link>
          }
        </div>
      </div>

      <div className="card">
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Image</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {authors.map((author) => (
                <tr key={author.id}>
                  <td><strong>{author.name}</strong></td>
                  <td>{author.slug}</td>
                  <td>
                    <img style={{ width: "100px" }} src={BACKEND_URL + author.image || "/placeholder.svg"} />
                  </td>
                  <td>
                      <div style={{ width: '500px', whiteSpace: 'normal' }}
                        dangerouslySetInnerHTML={{ __html: author.description }}
                      />
                  </td>
                  <td>
                    <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                        {adminInfo[0].can_access.split(',').includes('AuthorEdit') &&
                          <Link className="dropdown-item" to={`/author/edit/${author.id}`}>
                            <i className="bx bx-edit-alt me-1"></i> Edit
                          </Link>
                        }

                        {adminInfo[0].can_access.split(',').includes('AuthorDelete') &&
                          <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleDelete(author.id) }}>
                            <i className="bx bx-trash me-1"></i> Delete
                          </a>
                        }
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {authors.length === 0 && (
                <tr><td colSpan="4">No authors found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AuthorManage;
