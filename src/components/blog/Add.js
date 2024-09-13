import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Store } from '../../Store';

import { API_TOKEN, API_URL } from "../../Constants.js";

import Layout from '../Layout';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function BlogAdd() {

    const [categories, setCategories] = useState();

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

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
      category_id: "",
      name: "",
      slug: "",
      image_name: "",
      image_alt: "",
      bdate: "",
      meta_title: "",
      meta_keywords: "",
      meta_description: "",
      publish: 1,
    });

    const [selectedFile, setSelectedFile] = useState();
    const [description, setDescription] = useState();

    const handleInputChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const handleFileChange = (event) => {
  		setSelectedFile(event.target.files[0]);
  	};

    const handleDescriptionChange = (event, editor) => {
      setDescription(editor.getData());
  	};

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': API_TOKEN
    }

    const addBlog = async () => {

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('category_id', inputs.category_id);
      formData.append('name', inputs.name);
      formData.append('slug', inputs.slug);
      formData.append('image_alt', inputs.image_alt);
      formData.append('image_name', inputs.image_name);
      formData.append('description', description);
      formData.append('bdate', inputs.bdate);
      formData.append('meta_title', inputs.meta_title);
      formData.append('meta_keywords', inputs.meta_keywords);
      formData.append('meta_description', inputs.meta_description);
      formData.append('publish', inputs.publish);

      const res = await axios
        .post(`${API_URL}blog/add`, formData, {
            headers: headers
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      addBlog()
        .then((data) => {
          if(!data.error) {
            toast.success(data.message);
            navigate('/blog');
          } else {
            toast.error(data.message);
          }
        })

    };

    return (
      <Layout>
        <Helmet>
          <title>Blog Add</title>
        </Helmet>
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Blog Add</h4>
        <div className="row">
          <div className="col-xl">
            <div className="card mb-4">

              <div className="card-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" required onChange={handleInputChange}
                    value={inputs.name} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input type="text" className="form-control" name="slug" onChange={handleInputChange}
                    value={inputs.slug} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-control" name="category_id" value={inputs.category_id} onChange={handleInputChange} required>
                      <option value="">Select</option>
                      {categories &&
                        categories.map((category, index) => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" required onChange={handleFileChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image Name</label>
                    <input type="text" className="form-control" name="image_name" onChange={handleInputChange}
                    value={inputs.image_name} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image Alt</label>
                    <input type="text" className="form-control" name="image_alt" onChange={handleInputChange}
                    value={inputs.image_alt} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <CKEditor
                      editor={ ClassicEditor }
                      data={description}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" name="bdate" required onChange={handleInputChange}
                    value={inputs.bdate} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Meta Title</label>
                    <input type="text" className="form-control" name="meta_title" onChange={handleInputChange}
                    value={inputs.meta_title} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Meta Keywords</label>
                    <input type="text" className="form-control" name="meta_keywords" onChange={handleInputChange}
                    value={inputs.meta_keywords} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Meta Description</label>
                    <textarea className="form-control" name="meta_description" onChange={handleInputChange}
                    value={inputs.meta_description}></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Publish</label>
                    <select className="form-control" name="publish" value={inputs.publish} onChange={handleInputChange} required>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
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

export default BlogAdd;
