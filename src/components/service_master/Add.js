import { Helmet } from "react-helmet-async";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../Layout";
import { Store } from "../../Store";
import { API_URL, API_TOKEN } from "../../Constants";
import axios from "axios";
import RichTextEditor from "../RichTextEditor";

function ServiceAdd() {
  const { state } = useContext(Store);
  const { adminInfo } = state;
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    slug: "",
    region: "",
  });

  const [description, setDescription] = useState("");

  const handleInputChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: API_TOKEN,
  };

  const addService = async () => {
    const payload = {
      ...inputs,
      section_1_description: description,
    };

    const res = await axios
      .post(`${API_URL}service/add`, payload, { headers })
      .catch((err) => console.log(err));
    return res?.data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addService().then((data) => {
      if (!data.error) {
        toast.success(data.message);
        navigate("/service");
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Service Add</title>
      </Helmet>
      <h4 className="fw-bold py-3 mb-4">Service Add</h4>
      <div className="row">
        <div className="col-xl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                  <label className="form-label">Slug</label>
                  <input
                    type="text"
                    className="form-control"
                    name="slug"
                    onChange={handleInputChange}
                    value={inputs.slug}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Region</label>
                  <input
                    type="text"
                    className="form-control"
                    name="region"
                    onChange={handleInputChange}
                    value={inputs.region}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Section 1 Description</label>
                  <RichTextEditor
                    initialValue={description}
                    getValue={(value) => setDescription(value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ServiceAdd;
