import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Store } from '../../Store';

import * as constants from "../../Constants";
import Layout from '../Layout';
import RichTextEditor from "../RichTextEditor.js"

function AuthorEdit() {
  const { state } = useContext(Store);
  const { adminInfo } = state;
  const navigate = useNavigate();

  const { API_TOKEN, API_URL, BACKEND_URL } = constants;

  const [inputs, setInputs] = useState({
    name: "",
  });
  const [description, setDescription] = useState()
  const [selectedFile, setSelectedFile] = useState()

  const { id } = useParams();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': API_TOKEN
  };

  const getAuthor = async () => {
    try {
      const res = await axios.get(`${API_URL}author/single/${id}`, { headers });
      const data = res.data;
      if (data.author) {
        setInputs({
          name: data.author.name,
          image: data.author.image,
          description: data.author.description || '',
        });

        setDescription(data.author.description);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAuthor();
  }, [id]);

  const handleInputChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const editAuthor = async () => {
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('name', inputs.name);
      formData.append('description', description);
      formData.append('imageHidden', inputs.image); // for fallback on existing image
      if (selectedFile) {
        formData.append('image', selectedFile); // only append if new file is selected
      }

      const res = await axios.post(`${API_URL}author/edit`, formData, {
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

    editAuthor().then((data) => {
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
        <title>Author Edit</title>
      </Helmet>
      <h4 className="fw-bold py-3 mb-4">Author Edit</h4>
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
                  <input type="file" className="form-control" onChange={handleFileChange} />
                  <input type="hidden" name="imageHidden" value={inputs.image} />
                  <img style={{ width: "100px" }} src={BACKEND_URL + inputs.image || "/placeholder.svg"} />
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
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AuthorEdit;
