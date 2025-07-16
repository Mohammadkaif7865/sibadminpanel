import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from 'react-toastify';
import { Store } from '../../Store';

import { API_TOKEN, API_URL } from "../../Constants.js";

import Layout from '../Layout';
import RichTextEditor from "../RichTextEditor.js"

function AuthorAdd() {
  const { state } = useContext(Store);
  const { adminInfo } = state;
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
  });
  const [description, setDescription] = useState()

  // File uploads
  const [selectedFile, setSelectedFile] = useState()

  const handleInputChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': API_TOKEN
  };

  const addAuthor = async () => {
    try {
      const formData = new FormData();
      formData.append("name", inputs.name);
      formData.append("description", description);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await axios.post(`${API_URL}author/add`, formData, {
        headers: {
          'Authorization': API_TOKEN,
          'Content-Type': 'multipart/form-data'
        }
      });

      return res.data;
    } catch (err) {
      console.error("Upload error:", err.response ? err.response.data : err.message);
      return { error: true, message: 'Request failed' };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addAuthor().then((data) => {
      if (!data.error) {
        toast.success(data.message);
        navigate('/author');
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Author Add</title>
      </Helmet>
      <h4 className="fw-bold py-3 mb-4">Author Add</h4>
      <div className="row">
        <div className="col-xl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    required
                    onChange={handleInputChange}
                    value={inputs.name}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input type="file" className="form-control" required onChange={handleFileChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <RichTextEditor
                    initialValue={description}
                    getValue={(value) => {
                      setDescription(value)
                    }}
                  />
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

export default AuthorAdd;
