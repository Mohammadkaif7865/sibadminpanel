import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { compareAsc, format } from "date-fns";
import { Modal, Box, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { BACKEND_URL, API_TOKEN, API_URL } from "../../Constants.js";

import Layout from "../Layout";

import { Store } from "../../Store";

function EnquiryManage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { adminInfo } = state;
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState();
  const [enquiry, setEnquiry] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: API_TOKEN,
  };

  const getEnquiries = async () => {
    const res = await axios
      .get(`${API_URL}home/enquiry/all`, {
        headers: headers,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    if (data.enquiries) {
      setEnquiries(data.enquiries);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "calc(400px + 20vw)",
    bgcolor: "background.paper",
    boxShadow: 24,
    maxHeight: "80vh", // Set the max height to 80% of the viewport height
    overflowY: "auto", // Enable vertical scrolling if content overflows
    p: 4,
  };
  useEffect(() => {
    getEnquiries();
  }, []);

  const deleteEnquiry = async (id) => {
    const res = await axios
      .post(
        `${API_URL}home/enquiry/delete`,
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
      deleteEnquiry(id).then((data) => {
        if (!data.error) {
          toast.success(data.message);
          setEnquiries(enquiries.filter((enquiry) => enquiry.id !== id));
        } else {
          toast.error(data.message);
        }
      });
    }
  };
  console.log("DFDSFDSFSDFSD", enquiry);
  return (
    <Layout>
      <Helmet>
        <title>Enquiry Manage</title>
      </Helmet>
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light"></span> Enquiry Manage
      </h4>

      <div className="card">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
          <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography id="modal-title" variant="h4" component="h2" marginBottom='10px'>
                Enquiry Details
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              alignItems="left"
            >
              <span>Name : {enquiry?.name}</span>
              <span>Company : {enquiry?.cname}</span>
              <span>Email : {enquiry?.email}</span>
              <span>Phone Number : {enquiry?.phone}</span>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop='10px'
            >
              <Typography id="modal-title" variant="h6" component="h2">
                Message
              </Typography>
            </Box>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {enquiry.details}
            </Typography>
          </Box>
        </Modal>
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Phone</th>
                {/* <th>Details</th> */}
                <th>Created At</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {enquiries &&
                enquiries.map((enquiry, index) => (
                  <tr key={enquiry.id}>
                    {console.log("TTTTTTDFGFDGDFG", enquiry)}
                    <td>{enquiry.id}</td>
                    <td>
                      <strong>{enquiry.name}</strong>
                    </td>
                    <td>
                      <strong>{enquiry.cname}</strong>
                    </td>
                    <td>{enquiry.email}</td>
                    <td>{enquiry.phone}</td>
                    {/* <td>{enquiry.details}</td> */}
                    <td>{format(new Date(enquiry.createdAt), "yyyy-MM-dd")}</td>
                    <td>
                      {/* <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                      {adminInfo[0].can_access.split(',').includes('EnquiryDelete') &&
                        <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); handleDelete(enquiry.id)}}><i className="bx bx-trash me-1"></i> Delete</a>
                      }
                      </div>
                    </div> */}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setEnquiry(enquiry);
                          handleOpen();
                        }}
                      >
                        <i class="bx bx-show me-1"></i> View
                      </span>
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
