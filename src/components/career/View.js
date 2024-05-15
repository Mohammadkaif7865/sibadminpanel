import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Store } from '../../Store';

import * as constants from "../../Constants";

import Layout from '../Layout';

function CareerView() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;
    const navigate = useNavigate();

    const {API_TOKEN, API_URL, BACKEND_URL} = constants;

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': API_TOKEN
    };

    const [career, setCareer] = useState();
    const [careerExperiences, setCareerExperiences] = useState();

    const { id } = useParams();

    const getCareer = async () => {
      const res = await axios.get(`${API_URL}home/career/single/${id}`, {
          headers: headers
        }).catch((err) => console.log(err));
        const data = await res.data;
        if(data.career) {
          setCareer(data.career);
          setCareerExperiences(data.careerExperiences);
        } else {
          navigate('/career');
        }
    };
    useEffect(() => {
      getCareer();
    }, [navigate, id]);

    return (
      <Layout>
        <Helmet>
          <title>Career View</title>
        </Helmet>
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Career View</h4>
        <div className="row">
          <div className="col-xl">
            <div className="card mb-4">
            <div className="card-body">
              {career && (
                <div className="view_single">

                  <div className="single_box">
                    <p className="title">Job details</p>
                    <div className="row row_flex">

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Job type</label>
                          <p>{career[0].jobtype}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Post applied for</label>
                          <p>{career[0].postapplied}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Job location</label>
                          <p>{career[0].job_location}</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="single_box">
                    <p className="title">Personal details</p>
                    <div className="row row_flex">

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">First Name</label>
                          <p>{career[0].fname}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Last Name</label>
                          <p>{career[0].lname}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Gender</label>
                          <p>{career[0].gender}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Date of Birth</label>
                          <p>{career[0].dob}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Category</label>
                          <p>{career[0].category}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Marital Status</label>
                          <p>{career[0].marital}</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="single_box">
                    <p className="title">Communication details</p>
                    <div className="row row_flex">

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Email</label>
                          <p>{career[0].email}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Phone</label>
                          <p>{career[0].phone}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Mobile</label>
                          <p>{career[0].mobile}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Fax</label>
                          <p>{career[0].fax}</p>
                        </div>
                      </div>

                      <div className="col-md-8"></div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Present Address</label>
                          <p>{career[0].pre_add}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Present City</label>
                          <p>{career[0].pre_city}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Present State</label>
                          <p>{career[0].pre_state}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Present Pincode</label>
                          <p>{career[0].pre_pincode}</p>
                        </div>
                      </div>

                      <div className="col-md-8"></div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Permanent Address</label>
                          <p>{career[0].perm_add}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Permanent City</label>
                          <p>{career[0].perm_city}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Permanent State</label>
                          <p>{career[0].perm_state}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Permanent Pincode</label>
                          <p>{career[0].perm_pincode}</p>
                        </div>
                      </div>

                      <div className="col-md-8"></div>


                    </div>
                  </div>

                  <div className="single_box">
                    <p className="title">Professional details</p>
                    <div className="row row_flex">

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Qualification</label>
                          <p>{career[0].qualification}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Total Experience</label>
                          <p>{career[0].total_ye} Years {career[0].total_me} Months</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">IT Experience</label>
                          <p>{career[0].it_ye} Years {career[0].it_me} Months</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="single_box">
                    <p className="title">Employment Details</p>
                    <div className="row row_flex">

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Current Salary</label>
                          <p>{career[0].current_salary}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Expected Salary</label>
                          <p>{career[0].expect_salary}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Notice Period</label>
                          <p>{career[0].notice_period}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Earliest Joining Date</label>
                          <p>{career[0].join_date}</p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">Current Job Status</label>
                          <p>{career[0].cur_jobsts}</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {careerExperiences.length > 0 &&
                  <div className="single_box">
                    <p className="title">Current/Previous Experience</p>

                    {careerExperiences.map((careerExperience, index) => (
                      <div key={careerExperience.id} className="row row_flex">

                        <div className="col-md-4">
                          <div className="mb-3 input_detail_box">
                            <label className="form-label">Company</label>
                            <p>{careerExperience.acomp_name_exp}</p>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3 input_detail_box">
                            <label className="form-label">Level</label>
                            <p>{careerExperience.acomp_level_exp}</p>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3 input_detail_box">
                            <label className="form-label">Industry</label>
                            <p>{careerExperience.acomp_ind_exp}</p>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3 input_detail_box">
                            <label className="form-label">Job Title</label>
                            <p>{careerExperience.acomp_jtitle_exp}</p>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3 input_detail_box">
                            <label className="form-label">From</label>
                            <p>{careerExperience.acomp_fyear_exp}-{careerExperience.acomp_fmonth_exp}</p>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3 input_detail_box">
                            <label className="form-label">To</label>
                            <p>{careerExperience.acomp_tyear_exp}-{careerExperience.acomp_tmonth_exp}</p>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="mb-3 input_detail_box">
                            <label className="form-label">Job Description</label>
                            <p>{careerExperience.acomp_jdesc_exp}</p>
                          </div>
                        </div>

                      </div>

                    ))}

                  </div>
                  }

                  <div className="single_box">
                    <p className="title"></p>
                    <div className="row row_flex">

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">How Did You Hear About this Job Position?</label>
                          <p>{career[0].from_source}</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="single_box">
                    <p className="title"></p>
                    <div className="row row_flex">

                      <div className="col-md-4">
                        <div className="mb-3 input_detail_box">
                          <label className="form-label">CV</label>
                          <p><a href={BACKEND_URL+career[0].resume} target="_blank">File</a></p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default CareerView;
