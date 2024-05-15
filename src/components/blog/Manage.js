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

function BlogManage() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState();

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': API_TOKEN
    }

    const getBlogs = async () => {
      const res = await axios.get(`${API_URL}blog/all`, {
          headers: headers
        }).catch((err) => console.log(err));
        const data = await res.data;
        if(data.blogs) {
          setBlogs(data.blogs);
        }
    };
    useEffect(() => {
      getBlogs();
    }, []);


    const deleteBlog = async (id) => {

      const res = await axios
        .post(`${API_URL}blog/delete`, {id: id}, {
            headers: headers
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleDelete = (id) => {

      if(window.confirm("Want to delete?")) {
        deleteBlog(id)
          .then((data) => {
            if(!data.error) {
              toast.success(data.message);
              setBlogs(blogs.filter(blog => blog.id !== id));
            } else {
              toast.error(data.message);
            }
          });
      }

    };

    return (
      <Layout>
        <Helmet>
          <title>Blog Manage</title>
        </Helmet>

        <div className="row">
          <div className="col-md-6">
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Blog Manage</h4>
          </div>
          <div className="col-md-6" style={{'text-align': 'right'}}>
          {adminInfo[0].can_access.split(',').includes('BlogAdd') &&
            <Link to="/blog/add" className="btn btn-primary">Add</Link>
          }
          </div>
        </div>

        <div className="card">
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Date</th>
                  <th>Publish</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {blogs &&
                blogs.map((blog, index) => (
                <tr key={blog.id}>
                  <td><strong>{blog.name}</strong></td>
                  <td>{blog.category_name}</td>
                  <td>
                    <img style={{width: '100px'}} src={BACKEND_URL+blog.image} />
                  </td>
                  <td>{format(new Date(blog.bdate), 'yyyy-MM-dd')}</td>
                  <td>{blog.publish == 1 ? ( <>Yes</> ) : (<>No</>)}</td>
                  <td>
                    <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                      {adminInfo[0].can_access.split(',').includes('BlogEdit') &&
                        <Link className="dropdown-item" to={`/blog/edit/`+blog.id}><i className="bx bx-edit-alt me-1"></i> Edit</Link>
                      }
                      {adminInfo[0].can_access.split(',').includes('BlogDelete') &&
                        <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); handleDelete(blog.id)}}><i className="bx bx-trash me-1"></i> Delete</a>
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

export default BlogManage;
