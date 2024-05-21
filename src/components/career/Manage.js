import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { compareAsc, format } from "date-fns";
// import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TableComponent from "./TableComponent.js";
import { BACKEND_URL, API_TOKEN, API_URL } from "../../Constants.js";

import Layout from "../Layout";

import { Store } from "../../Store";
import { CarRental } from "@mui/icons-material";

function CareerManage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { adminInfo } = state;
  const navigate = useNavigate();

  const [careers, setCareers] = useState();

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: API_TOKEN,
  };

  const getCareers = async () => {
    const res = await axios
      .get(`${API_URL}home/career/all`, {
        headers: headers,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    if (data.careers) {
      setCareers(data.careers);
    }
  };
  useEffect(() => {
    getCareers();
  }, []);

  const deleteCareer = async (id) => {
    const res = await axios
      .post(
        `${API_URL}home/career/delete`,
        { id: id },
        {
          headers: headers,
        }
      )
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = (id) => {
    if (window.confirm("Want to delete?")) {
      deleteCareer(id).then((data) => {
        if (!data.error) {
          toast.success(data.message);
          setCareers(careers.filter((career) => career.id !== id));
        } else {
          toast.error(data.message);
        }
      });
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "S No", accessor: "index" },
      { Header: "Applied For", accessor: "postapplied" },
      { Header: "Name", accessor: "fullName" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "mobile" },
      { Header: "Applied Date", accessor: "appliedDate" },
      // Add more columns as needed
    ],
    []
  );
  console.log("This is first career data", careers);
  return (
    <Layout>
      <Helmet>
        <title>Career Manage</title>
      </Helmet>
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light"></span> Career Manage
      </h4>

      <div className="card">
        {careers && (
          <TableComponent
            columns={columns}
            data={careers.map((career, index) => {
              const dateString = "2023-09-22T16:01:08.000Z";
              const date = new Date(career.createdAt);

              const day = date.getDate().toString().padStart(2, "0");
              const month = (date.getMonth() + 1).toString().padStart(2, "0");
              const year = date.getFullYear();

              const formattedDate = `${day}-${month}-${year}`;
              return {
                ...career,
                index: index + 1,
                fullName: career.fname + ` ${career.lname}`,
                appliedDate: formattedDate
              };
            })}
          />
        )}
      </div>
    </Layout>
  );
}

export default CareerManage;
