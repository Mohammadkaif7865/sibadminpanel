import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { BACKEND_URL, API_TOKEN, API_URL } from "../../Constants.js";

import Layout from '../Layout';

import { Store } from '../../Store';

function CategoryManage() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;
    const navigate = useNavigate();

    const [categories, setCategories] = useState();

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': API_TOKEN
    }

    const getCategories = async () => {
      const res = await axios.get(`${API_URL}category/all`, {
          headers: headers
        }).catch((err) => console.log(err));
        const data = await res.data;
        if(data.categories) {
          setCategories(data.categories);
        }
    };
    useEffect(() => {
      getCategories();
    }, []);


    const deleteCategory = async (id) => {

      const res = await axios
        .post(`${API_URL}category/delete`, {id: id}, {
            headers: headers
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleDelete = (id) => {

      if(window.confirm("Want to delete?")) {
        deleteCategory(id)
          .then((data) => {
            if(!data.error) {
              toast.success(data.message);
              setCategories(categories.filter(category => category.id !== id));
            } else {
              toast.error(data.message);
            }
          });
      }

    };

    return (
      <Layout>
        <Helmet>
          <title>Category Manage</title>
        </Helmet>

        <div className="row">
          <div className="col-md-6">
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Category Manage</h4>
          </div>
          <div className="col-md-6" style={{'textAlign': 'right'}}>
          {adminInfo[0].can_access.split(',').includes('CategoryAdd') &&
            <Link to="/category/add" className="btn btn-primary">Add</Link>
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
                  <th>Publish</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {categories &&
                categories.map((category, index) => (
                <tr key={category.id}>
                  <td><strong>{category.name}</strong></td>
                  <td>{category.slug}</td>
                  <td>{category.publish == 1 ? ( <>Yes</> ) : (<>No</>)}</td>
                  <td>
                    <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">

                      {adminInfo[0].can_access.split(',').includes('CategoryEdit') &&
                        <Link className="dropdown-item" to={`/category/edit/`+category.id}><i className="bx bx-edit-alt me-1"></i> Edit</Link>
                      }

                      {adminInfo[0].can_access.split(',').includes('CategoryDelete') &&
                        <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); handleDelete(category.id)}}><i className="bx bx-trash me-1"></i> Delete</a>
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

export default CategoryManage;
