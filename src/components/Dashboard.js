import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import axios from "axios";
import * as CONSTANTS from "../Constants.js";

import Layout from './Layout';
import { Store } from '../Store';

function Dashboard() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { adminInfo } = state;
    const navigate = useNavigate();

    const [dashboardCount, setDashboardCount] = useState();

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': CONSTANTS.API_TOKEN
    }

    const getDashboardCount = async () => {
      const res = await axios.get(`${CONSTANTS.API_URL}home/admin/dashboard`, {
          headers: headers
        }).catch((err) => console.log(err));
        const data = await res.data;
        if(data.dashboardCount) {
          setDashboardCount(data.dashboardCount);
        }
    };
    useEffect(() => {
      getDashboardCount();
    }, []);

    return (
      <Layout>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Dashboard</h4>


        <div className="row row-flex  padding_card">

        {adminInfo[0].can_access.split(',').includes('CategoryManage') &&
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <p className="card-title">Categories</p>
              <p className="card-count">{dashboardCount && dashboardCount.category}</p>
            </div>
          </div>
        }

        {adminInfo[0].can_access.split(',').includes('BlogManage') &&
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <p className="card-title">Blogs</p>
              <p className="card-count">{dashboardCount && dashboardCount.blog}</p>
            </div>
          </div>
          }

          {adminInfo[0].can_access.split(',').includes('EnquiryManage') &&
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <p className="card-title">Enquiries</p>
              <p className="card-count">{dashboardCount && dashboardCount.contact_enquiry}</p>
            </div>
          </div>
          }

          {adminInfo[0].can_access.split(',').includes('CareerManage') &&
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <p className="card-title">Career Forms</p>
              <p className="card-count">{dashboardCount && dashboardCount.career}</p>
            </div>
          </div>
          }


        </div>

      </Layout>
    );
}

export default Dashboard;
