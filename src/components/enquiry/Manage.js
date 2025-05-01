import { Helmet } from "react-helmet-async";
import {
  Modal,
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { API_TOKEN, API_URL } from "../../Constants.js";
import Layout from "../Layout";
import { Store } from "../../Store";

function EnquiryManage() {
  const { state } = useContext(Store);
  const { adminInfo } = state;

  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [enquiry, setEnquiry] = useState({});
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const enquiriesPerPage = 10;

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: API_TOKEN,
  };

  const getEnquiries = async () => {
    try {
      const res = await axios.get(`${API_URL}home/enquiry/all`, { headers });
      const data = res.data;
      if (data.enquiries) {
        const sorted = [...data.enquiries].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setEnquiries(sorted);
      }
    } catch (err) {
      console.error("Error fetching enquiries:", err);
    }
  };

  const deleteEnquiry = async (id) => {
    const res = await axios
      .post(`${API_URL}home/enquiry/delete`, { id }, { headers })
      .catch((err) => console.log(err));
    return res.data;
  };

  const handleDelete = (id) => {
    if (window.confirm("Want to delete?")) {
      deleteEnquiry(id).then((data) => {
        if (!data.error) {
          toast.success(data.message);
          const updated = enquiries.filter((e) => e.id !== id);
          setEnquiries(updated);
        } else {
          toast.error(data.message);
        }
      });
    }
  };

  useEffect(() => {
    getEnquiries();
  }, []);

  useEffect(() => {
    applySearch();
  }, [searchTerm, enquiries]);

  const applySearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = enquiries.filter(
      (enq) =>
        enq.name?.toLowerCase().includes(term) ||
        enq.email?.toLowerCase().includes(term) ||
        enq.phone?.toLowerCase().includes(term) ||
        enq.cname?.toLowerCase().includes(term)
    );
    setFilteredEnquiries(filtered);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * enquiriesPerPage;
  const indexOfFirst = indexOfLast - enquiriesPerPage;
  const currentEnquiries = filteredEnquiries.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEnquiries.length / enquiriesPerPage);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "calc(400px + 20vw)",
    bgcolor: "background.paper",
    boxShadow: 24,
    maxHeight: "80vh",
    overflowY: "auto",
    p: 4,
  };

  return (
    <Layout>
      <Helmet>
        <title>Enquiry Manage</title>
      </Helmet>
      <h4 className="fw-bold py-3 mb-4">Enquiry Manage</h4>

      <div className="mb-3">
        <TextField
          fullWidth
          label="Search by name, email, phone, or company"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card">
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4">Enquiry Details</Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box display="flex" flexDirection="column">
              <span>Name : {enquiry?.name}</span>
              <span>Company : {enquiry?.cname}</span>
              <span>Email : {enquiry?.email}</span>
              <span>Phone Number : {enquiry?.phone}</span>
              <span>Date : {enquiry?.createdAt}</span>
            </Box>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Message
            </Typography>
            <Typography sx={{ mt: 1 }}>{enquiry.details}</Typography>
          </Box>
        </Modal>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Company</th>
                <th>Created At</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {currentEnquiries.map((enquiry, index) => (
                <tr key={enquiry.id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>
                    <strong>{enquiry.name}</strong>
                  </td>
                  <td>{enquiry.phone}</td>
                  <td>{enquiry.email}</td>
                  <td style={{ maxWidth: "200px" }}>
                    <strong>{enquiry.cname}</strong>
                  </td>
                  <td>{enquiry.createdAt?.slice(0, 10)}</td>
                  <td>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setEnquiry(enquiry);
                        setOpen(true);
                      }}
                    >
                      <i className="bx bx-show me-1"></i> View
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination d-flex justify-content-center mt-3">
              <Button
                variant="outlined"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                style={{ marginRight: "8px" }}
              >
                Previous
              </Button>
              <span className="align-self-center mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outlined"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default EnquiryManage;
